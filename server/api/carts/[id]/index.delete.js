import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const {id} = getRouterParams(e, "id");

    const cart = await prisma.carts.delete({
        where: {
            id
        },
    });
    
    return cart;
})