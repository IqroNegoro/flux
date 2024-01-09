import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const {id} = getRouterParams(e, "id");

    const cart = await prisma.carts.update({
        where: {
            id
        },
        data: {
            quantity: {
                decrement: 1
            }
        },
        select: {
            id: true,
            quantity: true
        }
    });
    
    return cart;
})