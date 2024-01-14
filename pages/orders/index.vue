<template>
    <div class="flex justify-center items-center flex-col gap-2 p-4 w-full lg:w-3/4 mx-auto" v-if="orders">
        <h1 class="font-bold text-4xl">Orders</h1>
        <p class="text-xl"> Your orders list here! </p>
        <div class="w-full flex flex-col gap-4">
            <OrderDetailCard v-for="order in orders" :key="order.id" :order="order" />
        </div>
    </div>
</template>
<script setup>

const { data: orders, pending, error, refresh } = await getOrders();

useHead({
    title: "Orders | Flux"
})
</script>