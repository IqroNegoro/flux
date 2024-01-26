<template>
    <NuxtLink :to="{name: 'products-id', params: {id: product.id}}" class="w-48 flex flex-col gap-1 shrink-0 p-2">
        <img :src="product.image" :alt="product.name" class="w-48 object-cover object-center aspect-square rounded-md">
        <div class="flex flex-col w-full gap-1">
            <h1 class="font-medium truncate"> {{ product.name }} </h1>
            <p class="font-medium text-sm"> {{ formatRp(product.price) }} </p>
            <p class="truncate text-xs"> {{ product.sub }} </p>
        </div>
    </NuxtLink>
</template>
<script setup>
const { product } = defineProps(["product"]);
</script>