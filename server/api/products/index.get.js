import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const filter = getQuery(e);

    const options = {
        where: {
            published: true,
       },
        orderBy: {
            [filter.orderBy || "createdAt"]: filter.type || "asc"
        }
    };

    if (+filter.highest) {
        options.where.price = {
            lte: +filter.highest
        }
    }

    if (+filter.lowest) {
        options.where.price = {
            ...options.where.price,
            gte: +filter.lowest
        }
    }

    if (filter?.categoryIds) {
        options.where.categoryIds = {
            has: filter.categoryIds
        }
    }

    let products = await prisma.products.findMany(options);

    return products;
})