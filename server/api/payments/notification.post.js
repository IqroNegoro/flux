import {
    Status
} from "@prisma/client";
import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const response = await readBody(e);

    const verify = await midtrans().transaction.notification(response);
    
    const { order_id, transaction_status, status_code, fraud_status } = verify;

    if (transaction_status === "settlement" && status_code == 200 && fraud_status === "accept") {
        const order = await prisma.transactions.update({
            where: {
                orderId: order_id
            },
            data: {
                midtransResponse: response,
                status: Status.PENDING,
                paymentStatus: transaction_status
            }
        });

        const products = await prisma.$transaction(
            order.products.map(v => prisma.products.update({
                where: {
                    id: v.id,
                },
                data: {
                    stock: {
                        decrement: v.quantity
                    }
                }
            }))
        );
    };

    setResponseStatus(e, 200);
    return {};
});