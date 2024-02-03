import prisma from "~/server/db"

export default defineEventHandler(async e => {
    const { id } = getRouterParams(e);

    let [reviews, ratings] = await prisma.$transaction([
        prisma.ratings.findMany({
            where: {
                productId: id
            },
            select: {
                user: {
                    select: {
                        name: true
                    }
                },
                content: true,
                rate: true,
                createdAt: true
            },
            orderBy: {
                rate: 'desc'
            }
        }),
        prisma.ratings.groupBy({
            by: "rate",
            orderBy: {
                rate: "asc"
            },
            where: {
                productId: id
            },
            _count: {
                _all: true,
            },
        })
    ]);

    ratings = ratings.map(v => ({rate: v.rate, total: v._count._all, avg: ((v._count._all / reviews.length) * 100).toFixed()}));

    return {
        reviews,
        ratings
    };
});