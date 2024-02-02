import prisma from "~/server/db";
import isMongoId from "validator/lib/isMongoId.js";

export default defineEventHandler(async e => {
    const {productId} = await readBody(e);

    if (!isMongoId(productId)) throw createError({
        statusCode: 400,
        message: "The ID is not MongoID",
        data: {
            id: "The ID is not MongoID"
        }
    });

    const cart = await prisma.carts.upsert({
        where: {
            productId_userId: {
                productId,
                userId: e.context.auth.id
            }
        },
        create: {
            productId,
            userId: e.context.auth.id,
            quantity: 1
        },
        update: {
            quantity: {
                increment: 1
            }
        }
    });

    return cart;
});