import prisma from "~/server/db";
import {v4} from "uuid";

export default defineEventHandler(async e => {
    const data = await readBody(e);

    const products = data.items.map(v => v.product?.id);

    const item_details = await prisma.products.findMany({
        where: {
            id: {
                in: products
            }
        },
        select: {
            id: true,
            image: true,
            name: true,
            price: true,
            description: true
        }
    })

    const gross_amount = item_details.reduce((prev, next, i) => prev + (next.price * data.items[i].quantity), 0);

    if (gross_amount != data.total) throw createError({
        statusCode: 500
    });

    let parameter = {};

    if (data.payment_type === 'bank_transfer') {
        parameter = {
            payment_type: "bank_transfer",
            bank_transfer: {
                bank: data.payment_provider
            }
        }

        if (data.payment_provider === 'permata') {
            parameter.bank_transfer.permata = {
                recipient_name: e.context.auth.name
            }
        }
    }

    if (data.payment_type === 'ewallet') {
        parameter.payment_type = data.payment_provider
    }

    parameter.transaction_details = {
        gross_amount,
        order_id: v4()
    }

    parameter.customer_details = {
        email: e.context.auth.email,
        first_name: e.context.auth.name,
        phone: data.shipping_address.phone,
        address: data.shipping_address.address,
        shipping_address: {...data.shipping_address}
    }

    parameter.item_details = item_details.map((v, i) => ({...v, quantity: data.items[i].quantity}))
    
    parameter.custom_expiry = {
        expiry_duration: 1,
        unit: "day"
    }

    console.log(parameter)

    return midtrans().charge(parameter).then(async res => {
        console.log(res);
        const order = await prisma.transactions.create({
            data: {
                orderId: res.order_id,
                products: parameter.item_details,
                userId: e.context.auth.id,
                total: parseInt(res.gross_amount),
                method: res.payment_type,
                paymentStatus: res.transaction_status,
                midtransResponse: res,
                shippingAddress: data.shipping_address
            }
        });
        setResponseHeaders(e, 201);
        return {
            message: "Order created",
            data: order.id,
        }
    }).catch(({ApiResponse}) => {
        console.log(ApiResponse)
        let error = null;
        if (ApiResponse.status_code == 505 || ApiResponse.status_code == 503) {
            error = {
                type: "payment_provider",
                message: "Cannot create order with this payment provider, please choose another"
            }
        };

        return createError({
            statusCode: ApiResponse.status_code || 500,
            message: ApiResponse.status_message || "Something went wrong",
            data: error
        });
    })
})