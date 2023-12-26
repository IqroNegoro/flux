import prisma from "../db";
import bcrypt from "bcrypt";

export default defineEventHandler(async event => {
    try {
        const data = await readBody(event);
        if (await prisma.users.findUnique({
            where: {
                email: data.email
            }
        })) {
            return createError({
                statusCode: 409,
                message: "Email already in use",
            })
        };
        
        data.password = bcrypt.hashSync(data.password, 10);
        const users = await prisma.users.create({
            data,
            select: {
                email: true,
                name: true,
            }
        });
        setResponseStatus(event, 201);
        return users
    } catch (error) {
        console.log(error)
        return createError({
            status: 500,
            message: "Something went wrong"
        })
    }
})