import prisma from "~/server/db";
import isMongoId from "validator/lib/isMongoId.js";

export default defineEventHandler(async e => {
    const {id} = getRouterParams(e, "id");
   
    if (!isMongoId(id)) throw createError({
        statusCode: 400,
        message: "Invalid ID",
        data: {
            id: "Invalid ID"
        }
    });

    const order = await prisma.transactions.findUnique({
        where: {
            id,
            userId: e.context.auth.id
        }
    });

    if (!order) throw createError({
        statusCode: 404,
        message: "Order not found"
    });

    return order
})