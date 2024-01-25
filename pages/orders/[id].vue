<template>
<div class="flex justify-center items-center flex-col gap-2 p-4 w-full lg:w-3/4 mx-auto" v-if="order">
    <h1 class="font-bold text-4xl">Order</h1>
    <p class="text-xl"> Check your order status </p>
        <div class="w-full flex justify-center flex-col md:flex-row items-center md:items-start gap-8">
            <div class="w-full flex flex-col gap-4">
                <OrderCard v-for="product in order.products" :key="product.id" :product="product" />
            </div>
            <div class="w-3/4 flex flex-col gap-8 max-md:order-first">
                <div class="w-full flex flex-col bg-gray-100 p-8 justify-between rounded-md">
                    <div>
                        <h1 class="text-xl font-medium">Order Summary</h1>
                        <table class="w-full table-fixed">
                            <tbody>
                                <tr class="font-medium">
                                    <td>Order ID</td>
                                    <td>{{ order.orderId }}</td>
                                </tr>
                                <tr class="font-medium">
                                    <td>Payment</td>
                                    <td>{{ pascal(order.method) || '-' }}</td>
                                </tr>
                                <tr class="font-medium">
                                    <td>Bank</td>
                                    <td>{{ capitalize(order.midtransResponse.va_numbers[0].bank) }}</td>
                                </tr>
                                <tr class="font-medium">
                                    <td>VA Number</td>
                                    <td>{{ order.midtransResponse.va_numbers[0].va_number }}</td>
                                </tr>
                                <tr class="font-medium">
                                    <td>Order Status</td>
                                    <td>{{ capitalize(order.status) }}</td>
                                </tr>
                                <tr class="font-medium">
                                    <td>Payment Status</td>
                                    <td>{{ capitalize(order.paymentStatus) }}</td>
                                </tr>
                                <tr class="font-medium">
                                    <td>Expiry Time</td>
                                    <td>{{ moment(order.midtransResponse.expiry_time).format("D MMMM YYYY, hh:mm:ss A") }}</td>
                                </tr>
                                <tr class="font-medium">
                                    <td>Subtotal</td>
                                    <td>{{ formatRp(order.total) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- <button class="bg-secondary py-2 hover:bg-primary font-medium w-full text-white" @click="handleCreateOrder" :disabled="pending">
                        <i v-if="pending" class="bx bx-loader-alt bx-spin"></i>
                        <p v-else>
                            Checkout
                        </p>
                    </button> -->
                </div>
            </div>
        </div>
    </div>   
</template>
<script setup>
import moment from "moment";
const { id } = useRoute().params;
console.log(id)
const { data: order, pending, error, refresh } = await getOrder(id);

useHead({
    title: "Order | Flux"
})
</script>