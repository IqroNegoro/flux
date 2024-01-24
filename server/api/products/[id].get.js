import prisma from "~/server/db";
import isMongoId from "validator/lib/isMongoId"
import unescape from "validator/lib/unescape";

export default defineEventHandler(async e => {
    const {id} = getRouterParams(e, "id");
   
    if (!isMongoId(id)) throw createError({
        statusCode: 400,
        message: "Invalid ID",
        data: {
            id: "Invalid ID"
        }
    });

    const product = await prisma.products.findUnique({
        where: {
            id
        }
    });

    product.description = unescape(product.description)

    if (!product) throw createError({
        statusCode: 404,
        message: "Product not found"
    });

    return product
})