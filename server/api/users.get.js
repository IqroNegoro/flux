import prisma from "~/server/db";

export default defineEventHandler(async event => {
    const users = await prisma.users.findMany({
        select: {
            id: true,
            email: true,
            name: true
        }
    });

    return users
})