<template>
    <div class="p-4">
        <div class="grid grid-cols-4 grid-flow-row gap-4">
            <ProductCard v-for="product in products" :product="product" />
        </div>
    </div>
</template>
<script setup>
const user = useUser();
const { data: products, pending, error, refresh } = await useFetch("https://fakestoreapi.com/products");
console.log(products.value)
useHead({
    title: "Flux Store"
})
</script>