<template>
    <div class="flex flex-row gap-4 w-full relative pr-1">
        <button class="absolute top-0 right-1" @click="checkout.delete(cart)">
            <i class="bx bx-x"></i>
        </button>
        <img :src="cart.product?.images[0]" alt="" class="aspect-square w-32 h-32 object-cover object-center rounded-md">
        <div class="flex flex-col items-start w-full">
            <div>
                <p class="font-medium text-sm md:text-lg">
                    {{ cart.product?.name }}
                </p>
                <p class="text-gray-500 text-sm">
                    x{{ cart.quantity }}
                </p>
            </div>
            <div class="flex flex-col">
                <span class="text-sm text-gray-500">{{formatRp(cart.product?.price)}}</span>
                <span class="text-sm text-gray-500">{{formatRp(cart.product?.price * cart.quantity)}}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
const { cart } = defineProps(["cart"]);

const checkout = useCheckout();
</script>