<template>
    <NuxtLink :to="{name: 'products-id', params: {id: product.id}}" class="w-48 flex flex-col gap-1 shrink-0 p-2">
        <img :src="product.image" :alt="product.name" class="w-48 object-cover object-center aspect-square rounded-md">
        <div class="flex flex-col w-full gap-1">
            <h1 class="font-medium truncate"> {{ product.name }} </h1>
            <p class="font-medium text-sm"> {{ formatRp(product.price) }} </p>
            <p class="truncate text-xs"> {{ product.sub }} </p>
        </div>
        <button class="py-2 bg-primary rounded-sm text-white font-medium text-sm" @click.prevent="user.authenticated ? handleAdd() : unauthenticated = true">
            <i v-if="pending" class="bx bx-loader-alt bx-spin"></i>
            <p v-else>
                Add to cart
            </p>
        </button>
    </NuxtLink>
</template>
<script setup>
const user = useUser();
const unauthenticated = useUnauthenticated();
const notification = useNotification();
const { product } = defineProps(["product"]);
const { data, pending, error, execute } = await addToCart(product.id);
pending.value = false;

const handleAdd = async () => {
    await execute();

    if (error.value) {
        notification.error("Something wrong, try again")
    }
    notification.success("Item added to cart")
}
</script>