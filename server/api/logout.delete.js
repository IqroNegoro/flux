import prisma from "../db";

export default defineEventHandler(async e => {
    try {
        const {refresh} = parseCookies(e);
        deleteCookie(e, "token", {
            httpOnly: true,
            secure: true
        });

        deleteCookie(e, "refresh", {
            httpOnly: true,
            secure: true
        });

        const saving = await prisma.tokens.update({
            where: {
                userId: e.context.auth.id
            },
            data: {
                token: null,
                expired: null
            }
        });
        setResponseStatus(e, 204);
        return {
            message: "Success logout"
        }
    } catch (error) {
        console.log(error)
        return createError({
            statusCode: error.statusCode || 500,
            message: error.message || "Something went wrong"
        })
    }
})