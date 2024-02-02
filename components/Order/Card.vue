<template>
    <div class="flex flex-row gap-4 p-2 relative" :class="{'w-full': $route.name != 'orders', 'shrink-0': $route.name == 'orders'}">
        <img :src="product?.image" alt="" class="aspect-square w-32 h-32 object-cover object-center rounded-md">
        <div class="flex flex-col justify-between items-start w-full" v-if="$route.name != 'orders'">
            <div>
                <p class="font-medium truncate">
                    {{ product?.name }}
                </p>
                <p class="text-gray-500 text-sm">
                    x{{ product.quantity }}
                </p>
            </div>
            <div class="flex flex-col">
                <span class="text-sm text-gray-500">{{ formatRp(product?.price) }}</span>
                <span class="text-sm text-gray-500">{{ formatRp(product?.price * product.quantity) }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
const { product } = defineProps(["product"]);
</script>