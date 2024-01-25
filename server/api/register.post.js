import prisma from "~/server/db";
import bcrypt from "bcrypt";
import { object, string } from "yup";

export default defineEventHandler(async e => {
    let body = await readBody(e);

    let { name, email, password } = await object({
        name: string().required(),
        email: string().required().email(),
        password: string().required()
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

    if (await prisma.users.findUnique({
        where: {
            email
        }
    })) {
        return createError({
            statusCode: 409,
            message: "Email already in use",
        })
    };
    
    password = bcrypt.hashSync(password, 10);

    const users = await prisma.users.create({
        data: {
            name,
            email,
            password
        },
        select: {
            email: true,
            name: true,
        }
    });
    setResponseStatus(e, 201);
    return users
})