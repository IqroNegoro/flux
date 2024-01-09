<template>
    <div class="flex justify-center items-center flex-col gap-2 p-4 w-3/4 mx-auto">
        <h1 class="font-bold text-4xl">Shopping Cart</h1>
        <p class="text-xl"> Make sure nothing left </p>
        <div class="w-full flex justify-center flex-col md:flex-row items-center md:items-start gap-8">
            <div class="w-full flex flex-col gap-4">
                <CartCard v-for="cart in carts" :key="cart.id" :cart="cart" @qty="cart => carts.find(v => v.id == cart.id).quantity = cart.quantity" @delete-cart="id => carts = carts.filter(v => v.id != id)" />
            </div>
            <div class="w-3/4 h-96 p-4 md:p-12 flex flex-col justify-between bg-gray-100 rounded-md max-md:order-first">
                <div>
                    <h1 class="text-xl font-medium">Order Summary</h1>
                    <table class="w-full table-fixed">
                        <tbody>
                            <tr class="font-medium">
                                <td>Subtotal</td>
                                <td>{{formatRp(total)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button class="bg-secondary py-2 hover:bg-primary font-medium w-full text-white">
                    Checkout
                </button>
            </div>
        </div>
        <div class="w-full p-4 flex flex-col gap-4">
        </div>
    </div>
</template>
<script setup>

const { data: carts, pending, error, refresh } = await getCarts();
const total = computed(() => carts.value.reduce((prev, next) => prev + (next.product.price * next.quantity),0))

useHead({
    title: "Checkout | Flux"
})
</script>