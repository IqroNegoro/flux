<template>
    <div class="w-full flex flex-col gap-4 min-h-96 rounded-md bg-gray-50 p-4">
        <div>
            <h1><span class="font-medium">Order ID</span> {{ order.orderId }}</h1>
        </div>
        <div class="grid grid-rows-1 grid-cols-3">
            <OrderCard v-for="product in order.products" :key="product.id" :product="product" />
        </div>
        <div class="w-full flex justify-between items-start">
            <div>
                <h1 class="font-medium">Delivery Address</h1>
                <div class="flex flex-col text-sm text-gray-500">
                    <p> {{ order.shippingAddress.first_name }} </p>
                    <p> {{ order.shippingAddress.province }}, {{ order.shippingAddress.city }}</p>
                    <p> {{ order.shippingAddress.address }} </p>
                    <p> {{ order.shippingAddress.postal_code }} </p>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <h1 class="font-medium">Payment Status</h1>
                <NuxtLink :to="{name: 'orders-id', params: {id: order.id}}" class="border border-primary rounded-sm text-center font-medium" :class="{'bg-primary text-white': order.paymentStatus == 'settlement'}">
                    {{ order.paymentStatus == 'settlement' ? 'Paided' : 'Unpaid' }}
                </NuxtLink>
            </div>
        </div>
        <hr>
        <div class="flex flex-col gap-4">
            <div class="w-full rounded-full h-4 bg-black/10">
                <div class="bg-primary h-4 rounded-full" :class="{'w-[25%]': order.status === 'CREATED', 'w-[50%]': order.status === 'PENDING', 'w-[75%]': order.status === 'CONFIRMED', 'w-full': order.status === 'SUCCESS'}"></div>
            </div>
            <div class="flex flex-row justify-between items-center">
                <div class="flex flex-col gap-2 justify-center items-center">
                    <div class="bg-primary p-2 rounded-md w-min">
                        <div class="rounded-full p-1 flex justify-center items-center bg-white">
                            <i class="bx bx-check"></i>
                        </div>
                    </div>
                    <p class="font-medium">Order Created</p>
                </div>
                <div class="flex flex-col gap-2 justify-center items-center">
                    <div class="bg-primary p-2 rounded-md w-min">
                        <div class="rounded-full p-1 flex justify-center items-center bg-white">
                            <i class="bx bx-check-double"></i>
                        </div>
                    </div>
                    <p class="font-medium">Order Paided</p>
                </div>
                <div class="flex flex-col gap-2 justify-center items-center">
                    <div class="bg-primary p-2 rounded-md w-min">
                        <div class="rounded-full p-1 flex justify-center items-center bg-white">
                            <i class="bx bx-package"></i>
                        </div>
                    </div>
                    <p class="font-medium">Order Processed</p>
                </div>
                <div class="flex flex-col gap-2 justify-center items-center">
                    <div class="bg-primary p-2 rounded-md w-min">
                        <div class="rounded-full p-1 flex justify-center items-center bg-white">
                            <i class="bx bxs-ship"></i>
                        </div>
                    </div>
                    <p class="font-medium">Order Shipped</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { order } = defineProps(["order"]);
</script>