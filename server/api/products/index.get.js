import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const data = getQuery(e);
    console.log(data.orderBy ? "asli" : "palsu")
    const {orderBy = "createdAt", price, categoryIds, type = 'asc'} = getQuery(e);

    console.log(orderBy, type)

    let products = await prisma.products.findMany({
        where: {
             published: true,
        },
        orderBy: {
            [orderBy || 'createdAt']: type
        }
    });

    return products;
})