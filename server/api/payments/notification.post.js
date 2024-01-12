import { Status } from "@prisma/client";
import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const response = await readBody(e);
    console.log(response);
    const { order_id, transaction_status, status_code, fraud_status } = response;
    if (transaction_status === "settlement" && status_code === 200 && fraud_status === "accept");

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
});