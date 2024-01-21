import jwt from "jsonwebtoken";
import prisma from "~/server/db";

export default defineEventHandler(async e => {
    console.log(getRequestURL(e).pathname)
    if (!(e.path.search(/api/gi) >= 0)) return;

    const {token, refresh} = parseCookies(e);

    let user = undefined;
    const config = useRuntimeConfig();

    if (token) {
        user = jwt.verify(token, config.secret);
    }

    if (!token && refresh) {
        const userToken = await prisma.tokens.findFirst({
            where: {
                token: refresh
            }
        });
        console.log(`user`, userToken, `is expired ?`, userToken?.expired >= + new Date());
        if (userToken && userToken?.expired >= +new Date()) {
            user = await prisma.users.findUnique({
                where: {
                    id: userToken.userId
                },
            });
            
            delete user.password;

            const config = useRuntimeConfig();

            const token = jwt.sign(user, config.secret, {
                expiresIn: "15m"
            });

            const refresh = jwt.sign(user, config.refresh, {
                expiresIn: "1d"
            });
    
            const saving = await prisma.tokens.upsert({
                where: {
                    userId: userToken.userId
                },
                create: {
                    userId: userToken.userId,
                    token: refresh,
                    expired: new Date(Date.now() + (1000 * 60 * 60 * 24))
                },
                update: {
                    token: refresh,
                    expired: new Date(Date.now() + (1000 * 60 * 60 * 24))
                }
            });

            console.log("new refresh token invoked", saving)
        
            setCookie(e, "token", token, {
                maxAge: 60 * 15,
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            
            setCookie(e, "refresh", refresh, {
                maxAge: 60 * 60 * 24,
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            console.log("cooke set!")
        }
    }

    e.context.auth = user;
});