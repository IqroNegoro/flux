<template>
    <div class="p-4">
        <div class="grid grid-cols-4 grid-flow-row gap-4" v-if="!pending">
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