import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const { id } = getRouterParams(e, "id");

    const config = useRuntimeConfig();

    const transaction = await $fetch(`https://api.sandbox.midtrans.com/v2/${id}/status`, { //remove sandbox if ur in production
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(config.serverKey)}:`
        }
    })

    return transaction
})