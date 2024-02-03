import prisma from "~/server/db"
import { object, string, number } from "yup";

export default defineEventHandler(async e => {
    const { id } = getRouterParams(e);

    const body = await readForm(e);

    const {productId, content, rate} = await object({
        content: string().nullable().ensure(),
        rate: number().max(5, "Maximum star is 5").min(1, "Minimum star is 1").default(5)
    }).validate(body, {abortEarly: false}).catch(err => {
        let errors = {};
        err.inner.forEach(v => {
            errors[v.path] = v.message
        })
        throw createError({
            statusCode: 400,
            message: "Something went wrong",
            data: errors
        })
    });

    const [order, rating] = await prisma.$transaction([
        prisma.transactions.update({
            where: {
                id,
                userId: e.context.auth.id
            },
            data: {
                products: {
                    updateMany: {
                        where: {
                            id: productId,
                            isRated: false
                        },
                        data: {
                            isRated: true
                        }
                    }
                }
            }
        }),
        prisma.ratings.create({
            data: {
                userId: e.context.auth.id,
                productId,
                content,
                rate
            },
            select: {
                productId: true
            }
        })
    ]);

    return rating;
});