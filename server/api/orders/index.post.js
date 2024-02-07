import prisma from "~/server/db";
import { v4 } from "uuid";

export default defineEventHandler(async e => {
    const data = await readBody(e);

    // const products = await prisma.products.findMany({
    //     where: {
    //         id: {
    //             in: data.items.map(v => v.product.id)
    //         }
    //     },
    //     select: {
    //         id: true,
    //         image: true,
    //         name: true,
    //         weight: true,
    //         price: true,
    //         description: true,
    //     }
    // });

    const products = await prisma.$transaction(
        data.items.map(v => ({id: v.product.id, quantity: v.quantity})).map(v => prisma.products.findUnique({
            where: {
                id: v.id,
                stock: {
                    gte: v.quantity
                }
            },
            select: {
                id: true,
                images: true,
                name: true,
                weight: true,
                price: true,
                description: true,
            }
        }))
    );

    if (products.includes(null)) throw createError({ // check if quantity at checkout is not exceed
        statusCode: 409,
        message: "Sorry but some product cannot be checkout"
    });

    const item_details = products.map(v => ({...v, quantity: data.items.find(x => x.product.id == v.id).quantity}))

    const gross_amount = item_details.reduce((prev, next, i) => prev + (next.price * next.quantity), 0);

    if (gross_amount != data.total) throw createError({
        statusCode: 500,
        message: "Something wrong, try again"
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
        shipping_address: {
            ...data.shipping_address,
            city: data.shipping_address.city.city_name
        }
    }

    parameter.item_details = item_details;

    parameter.custom_expiry = {
        expiry_duration: 1,
        unit: "day"
    }

    return midtrans().charge(parameter).then(async res => {
        const order = await prisma.transactions.create({
            data: {
                orderId: res.order_id,
                products: parameter.item_details,
                userId: e.context.auth.id,
                total: parseInt(res.gross_amount),
                method: res.payment_type,
                paymentStatus: res.transaction_status,
                midtransResponse: res,
                shippingAddress: {
                    ...data.shipping_address,
                    city: data.shipping_address.city.city_name
                }
            }
        });

        const carts = await prisma.carts.deleteMany({
            where: {
                id: {
                    in: data.items.map(v => v.id)
                }
            }
        });

        setResponseHeaders(e, 201);

        return {
            message: "Order created",
            data: order.id,
        }
    }).catch((err) => {
        const {
            ApiResponse
        } = err;
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