<template>
    <div class="p-4 flex flex-col gap-2 w-full">
        <button class="hover py-2 px-4 font-medium w-max rounded-full" @click="openFilter = true">
            Filter
        </button>
        <template v-if="isFilter">
            <h1 class="font-medium text-xl">Filtered Products</h1>
            <div class="w-full flex flex-row overflow-x-auto max-md:hidden-scrollbar gap-4 my-2">
                <template v-if="pendingFiltered">
                    <ProductSkeleton v-for="i in 10" :key="i" />
                </template>
                <div v-else-if="!filteredProducts.length">
                    0 Products
                </div>
                <template v-else>
                    <ProductCard v-for="product in filteredProducts" :product="product" :key="product.id" />
                </template>
            </div>
        </template>
        <h1 class="font-medium text-xl">Top Products</h1>
        <div class="w-full flex flex-row overflow-x-auto max-md:hidden-scrollbar gap-4 my-2">
            <template v-if="pending">
                <ProductSkeleton v-for="i in 10" :key="i" />
            </template>
            <template v-else>
                <ProductCard v-for="product in products" :product="product" :key="product.id" />
            </template>
        </div>
        <LazyFilter v-show="openFilter" @close-filter="openFilter = false" @set-filter="filter => {filters = JSON.parse(JSON.stringify(filter)); isFilter = true; openFilter = false}" @reset-filter="isFilter = false" />  <!-- References effect -->
    </div>
</template>
<script setup>
const user = useUser();

const isFilter = ref(false);

const filters = ref({
    orderBy: "",
    price: {
        highest: 0,
        lowest: 0
    },
    categoryIds: ""
});

const { data: filteredProducts, pending: pendingFiltered, error: errorFiltered, refresh: refreshFiltered } = await getFilteredProducts(filters);
const { data: products, pending, error, refresh } = await getProducts();

const openFilter = ref(false);


useHead({
    title: "Flux Store"
})
</script>