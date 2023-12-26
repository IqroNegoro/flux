import prisma from "../db";

export default defineEventHandler(async event => {
    try {
        const users = await prisma.users.findMany({
            select: {
                id: true,
                email: true,
                name: true
            }
        });
        setResponseStatus(event, 200);
        return users
    } catch (error) {
        console.log(error)
        return createError({
            statusCode: 500,
            message: "Something went wrong"
        })
    }
})