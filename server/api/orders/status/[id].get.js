import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const {id} = getRouterParams(e, "id");

    

    return order
})