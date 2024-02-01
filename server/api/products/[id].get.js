import prisma from "~/server/db";
import isMongoId from "validator/lib/isMongoId.js"
import unescape from "validator/lib/unescape.js";

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

    if (!product) throw createError({
        statusCode: 404,
        message: "Product not found"
    });

    product.description = unescape(product.description)
    
    console.log(product.description)

    return product
})