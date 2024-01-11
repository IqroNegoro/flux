<template>
    <div class="flex flex-row gap-4 p-2 w-full relative">
        <button class="absolute top-0 right-1" @click="checkout.addToCheckout(cart)">
            <i class="bx bx-x"></i>
        </button>
        <img :src="cart.product?.image" alt="" class="aspect-square w-32 object-cover rounded-md">
        <div class="flex flex-col justify-between items-start w-full">
            <div>
                <p class="font-medium text-lg">
                    {{ cart.product?.name }}
                </p>
                <p>
                    {{ cart.product?.description }}
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