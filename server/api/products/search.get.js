import unescape from "validator/lib/unescape.js";
import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const { q, limit, c } = getQuery(e);

    if (!q) return [];

    const query = unescape(q);

    let option = {};

    if (c) {
        option = {
            createdAt: {
                gt: c
            }
        }
    }

    const products = await prisma.products.findMany({
        where: {
            name: {
                contains: query,
                mode: "insensitive"
            },
            ...option
        },
        take: +limit,
        select: {
            id: true,
            name: true,
            sub: true,
            images: true,
            price: true,
            createdAt: true
        },
        orderBy: {
            createdAt: "asc"
        }
    });

    return products;
});