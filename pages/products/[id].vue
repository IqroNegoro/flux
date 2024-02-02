<template>
    <div class="flex justify-center flex-col sm:flex-row p-4 gap-4" v-if="product">
        <img :src="product.image" :alt="product.name" class="md:w-[40rem] rounded-md aspect-square object-center object-cover">
        <div class="w-full flex flex-col gap-4">
            <div class="flex flex-col gap-1">
                <h1 class="text-lg md:text-4xl text-black font-medium">{{ product.name }}</h1>
                <p class="text-sm md:text-xl">{{formatRp(product.price)}}</p>
            </div>
            <div class="flex flex-col gap-1">
                <p class="text-xl">Product Description</p>
                <div class="text-gray-500 font-light whitespace-pre-line" v-html="product.description"></div>
            </div>
            <button class="p-2 md:w-48 flex justify-center items-center bg-secondary hover:bg-primary transition-colors duration-150 font-medium text-white rounded-sm" @click="user.authenticated ? handleAdd() : unauthenticated = true">
                <i v-if="cartPending" class="bx bx-loader-alt bx-spin"></i>
                <p v-else>
                    Add to cart
                </p>
            </button>
            <p class="text-xl">Reviews</p>
        </div>
    </div>
    <div v-else>

    </div>
</template>
<script setup>
const user = useUser();
const unauthenticated = useUnauthenticated();
const notification = useNotification();
const { id } = useRoute().params

const { data: product, pending, error, refresh } = await getProduct(id);

const { data: cart, pending: cartPending, error: errorCart, execute: executeCart } = await addToCart(id);
cartPending.value = false;

const handleAdd = async () => {
    await executeCart();

    if (errorCart.value) {
        notification.error("Something wrong, try again");
        return;
    }
    notification.success("Item added to cart")
}

useHead({
    title: () => `${product.value?.name} | Flux`
});

useSeoMeta({
    title: () => `${product.value?.name || ""} | Flux`,
    ogImage: () => product.value?.image || "",
    ogImageAlt: () => product.value?.name || "",
    ogTitle: () => `${product.value?.name || ""}`,
    twitterTitle: () => `${product.value?.name || ""}`,
    description: () => product.value?.description || "",
    ogDescription: () => product.value?.description || "",
    twitterDescription: () => product.value?.description || "",
    ogType: "website",
    ogSiteName: "Flux",
    applicationName: "Flux",
    twitterCard: "app",
    twitterImage: () => product.value?.images || "",
})
</script>