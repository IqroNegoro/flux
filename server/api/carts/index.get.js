import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const { skip, limit } = getQuery(e);

    const carts = await prisma.carts.findMany({
        where: {
            userId: e.context.auth.id
        },
        select: {
            id: true,
            product: {
                select: {
                    name: true,
                    image: true,
                    description: true,
                    price: true,
                    stock: true
                }
            },
            quantity: true
        },
        skip: parseInt(skip) || 0,
        take: parseInt(limit) || 10
    });

    return carts;
})