import isMongoId from "validator/lib/isMongoId.js";
import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const {id} = getRouterParams(e, "id");

    if (!isMongoId(id)) throw createError({
        statusCode: 400,
        message: "The ID is not MongoID",
        data: {
            id: "The ID is not MongoID"
        }
    });

    const checkQty = await prisma.carts.findUnique({
        where: {
            id
        },
        select: {
            product: {
                select: {
                    stock: true
                }
            },
            quantity: true
        }
    });

    if (checkQty && checkQty.quantity + 1 > checkQty.product.stock) throw createError({
        statusCode: 409,
        message: "Exceed the product stock"
    });
    
    const cart = await prisma.carts.update({
        where: {
            id
        },
        data: {
            quantity: {
                increment: 1
            }
        },
        select: {
            id: true,
            quantity: true
        }
    });
    
    return cart;
})