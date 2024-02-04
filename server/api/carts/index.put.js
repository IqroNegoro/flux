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

    const checkQty = await prisma.carts.findUnique({
        where: {
            productId_userId: {
                productId,
                userId: e.context.auth.id
            }
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

    if (!checkQty) {
        const product = await prisma.products.findUnique({
            where: {
                id: productId
            }
        });

        if (!product.stock) throw createError({
            statusCode: 409,
            message: "Exceed the product stock"
        })
    }
    
    if (checkQty && checkQty.quantity + 1 > checkQty.product.stock) throw createError({
        statusCode: 409,
        message: "Exceed the product stock"
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
            quantity: 1,
        },
        update: {
            quantity: {
                increment: 1
            }
        },
    });

    return cart;
});