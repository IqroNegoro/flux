import prisma from "~/server/db";
import unescape from "validator/lib/unescape.js";

export default defineEventHandler(async e => {
    let products = await prisma.products.findMany({
        // where: {
        //     available: true,
        //     status: true
        // }
    });

    return products;
})