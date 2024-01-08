<template>
    <div class="flex justify-center items-center flex-col gap-2 p-4 w-3/4 mx-auto">
        <h1 class="font-bold text-4xl">Shopping Cart</h1>
        <p class="text-xl"> Make sure nothing left </p>
        <div class="w-full flex justify-center flex-row items-center gap-8 divide-y divide-gray-200">
            <div class="w-full flex flex-col gap-4">
                <CartCard v-for="cart in carts" :key="cart.id" :cart="cart" />
            </div>
            <div class="w-3/4 h-96 p-12 flex flex-col bg-gray-200 rounded-md">
                <h1 class="text-xl font-medium">Order Summary</h1>
                <table class="w-full table-fixed">
                    <tbody>
                        <tr>
                            <td>Subtotal</td>
                            <td>{{formatRp(9999999)}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="w-full p-4 flex flex-col gap-4">
        </div>
    </div>
</template>
<script setup>

const { data: carts, pending, error, refresh } = await getCarts();

useHead({
    title: "Checkout | Flux"
})
</script>