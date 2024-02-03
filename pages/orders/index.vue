<template>
    <div class="flex justify-center items-center flex-col gap-2 p-4 w-full lg:w-3/4 mx-auto" v-if="orders">
        <h1 class="font-bold text-4xl">Orders</h1>
        <p class="text-xl"> Your orders list here! </p>
        <div class="w-full flex flex-col gap-4">
            <template v-if="pending">
                <OrderSkeletonCard v-for="i in 3" :key="i" />
            </template>
            <div v-else-if="error" class="flex justify-center items-center flex-col gap-4">
                <p>
                    Something wrong, try again
                </p>
                <button class="hover px-4 py-2" @click="refresh">Refresh</button>
            </div>
            <div v-else-if="!orders.length">
                <h1 class="font-medium text-center">0 Transactions</h1>
            </div>
            <template v-else>
                <OrderDetailCard v-for="order in orders" :key="order.id" :order="order" />
            </template>
        </div>
    </div>
</template>
<script setup>

const { data: orders, pending, error, refresh } = await getOrders();

useHead({
    title: "Orders | Flux"
})
</script>