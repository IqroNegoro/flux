import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const transactions = await prisma.transactions.findMany({
        where: {
            userId: e.context.auth.id
        }
    });

    return transactions;
})