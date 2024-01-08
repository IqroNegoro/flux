<template>
    <div class="flex justify-center flex-row p-4" v-if="product">
        <!-- {{ product }} -->
        <div class="w-full flex justify-center items-center">
            <img :src="product.image" :alt="product.name" class="w-3/4 rounded-md">
        </div>
        <div class="w-full p-4 flex flex-col gap-4">
            <h1 class="text-4xl text-black font-bold tracking-wider">{{ product.name }}</h1>
            <p class="text-gray-500 font-medium"> {{ product.description }} </p>
            <p class="text-xl font-light">{{formatRp(product.price)}}</p>
            <button class="p-2 w-48 flex justify-center items-center bg-secondary hover:bg-primary transition-colors duration-150 font-medium text-white rounded-sm" @click="executeCart">
                <i v-if="cartPending" class="bx bx-loader-alt bx-spin"></i>
                <p v-else>
                    Add to cart
                </p>
            </button>
        </div>
    </div>
</template>
<script setup>
const { id } = useRoute().params

const { data: product, pending, error, refresh } = await getProduct(id);

const { data: cart, pending: cartPending, error: errorCart, execute: executeCart } = await addToCart(id);
cartPending.value = false;

useHead({
    title: `${product.value?.name} | Flux`
});

useSeoMeta({
    title: `${product.value?.name} | Flux`,
    ogImage: product.value?.image
})
</script>