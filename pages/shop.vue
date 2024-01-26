<template>
    <div class="p-4 flex flex-col">
        <h1 class="font-medium text-xl">Top Products</h1>
        <div class="flex flex-row overflow-x-auto hidden-scrollbar gap-4 my-2" v-if="!pending">
            <ProductCard v-for="product in products" :product="product" :key="product.id" />
        </div>
    </div>
</template>
<script setup>
const user = useUser();
const { data: products, pending, error, refresh } = await getProducts();
useHead({
    title: "Flux Store"
})
</script>