<template>
    <div class="w-full flex flex-col gap-4 min-h-96 rounded-md bg-gray-100 p-4">
        <div class="flex flex-row justify-between">
            <h1><span class="font-medium">Order ID</span> {{ order.orderId }}</h1>
            <NuxtLink :to="{name: 'orders-id', params: {id: order.id}}" class="border border-primary rounded-sm text-center font-medium px-3 py-1" :class="{'bg-primary text-white': order.paymentStatus == 'settlement'}">
                Detail
            </NuxtLink>
        </div>
        <div class="flex flex-row gap-2 overflow-x-auto pb-2">
            <NuxtLink :to="{name: 'products-id', params: {id: product.id}}" v-for="product in order.products" :key="product.id" >
                <img :src="product?.image" :alt="product.name" class="aspect-square w-32 h-32 object-cover object-center rounded-md">
            </NuxtLink>
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
            <div class="font-medium text-xl flex flex-row justify-between items-center w-full">
                <p>Status Order</p>
                <p class="text-xs"> Updated at {{ moment(order.updatedAt).format('D/MM/y h:mm a') }}</p>
            </div>
            <div class="w-full rounded-full h-4 bg-black/10">
                <div class="bg-primary h-4 rounded-full" :class="{'w-[25%]': order.status === 'CREATED', 'w-[50%]': order.status === 'PENDING', 'w-[75%]': order.status === 'CONFIRMED', 'w-full': order.status === 'SUCCESS' || order.status === 'SHIP' || order.status == 'CANCEL'}"></div>
            </div>
            <div class="flex flex-row justify-between items-center">
                <div class="flex flex-col gap-2 justify-center items-center">
                    <div class="bg-primary p-2 rounded-md w-min hover:-translate-y-2 duration-150 transition-transform">
                        <div class="rounded-full p-1 flex justify-center items-center bg-white">
                            <i class="bx bx-check"></i>
                        </div>
                    </div>
                    <p class="max-md:text-xs font-medium">Created</p>
                </div>
                <template v-if="order.status != 'CANCEL' && order.status != 'SUCCESS'">
                    <div class="flex flex-col gap-2 justify-center items-center">
                        <div
                            class="bg-primary p-2 rounded-md w-min hover:-translate-y-2 duration-150 transition-transform">
                            <div class="rounded-full p-1 flex justify-center items-center bg-white">
                                <i class="bx bx-check-double"></i>
                            </div>
                        </div>
                        <p class="max-md:text-xs font-medium">Paided</p>
                    </div>
                    <div class="flex flex-col gap-2 justify-center items-center">
                        <div
                            class="bg-primary p-2 rounded-md w-min hover:-translate-y-2 duration-150 transition-transform">
                            <div class="rounded-full p-1 flex justify-center items-center bg-white">
                                <i class="bx bx-package"></i>
                            </div>
                        </div>
                        <p class="max-md:text-xs font-medium">Processed</p>
                    </div>
                    <div class="flex flex-col gap-2 justify-center items-center">
                        <div
                            class="bg-primary p-2 rounded-md w-min hover:-translate-y-2 duration-150 transition-transform">
                            <div class="rounded-full p-1 flex justify-center items-center bg-white">
                                <i class="bx bxs-ship"></i>
                            </div>
                        </div>
                        <p class="max-md:text-xs font-medium">Shipped</p>
                    </div>
                </template>
                <div v-else-if="order.status === 'SUCCESS'" class="flex flex-col gap-2 justify-center items-center">
                    <div class="bg-primary p-2 rounded-md w-min hover:-translate-y-2 duration-150 transition-transform">
                        <div class="rounded-full p-1 flex justify-center items-center bg-white">
                            <i class='bx bxs-checkbox-checked'></i>
                        </div>
                    </div>
                    <p class="max-md:text-xs font-medium">Success</p>
                </div>
                <div v-else class="flex flex-col gap-2 justify-center items-center">
                    <div class="bg-primary p-2 rounded-md w-min hover:-translate-y-2 duration-150 transition-transform">
                        <div class="rounded-full p-1 flex justify-center items-center bg-white">
                            <i class="bx bx-x"></i>
                        </div>
                    </div>
                    <p class="max-md:text-xs font-medium">Cancel</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import moment from "moment";
const { order } = defineProps(["order"]);
</script>