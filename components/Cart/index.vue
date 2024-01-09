<template>
    <div class="fixed top-0 left-0 w-full h-full bg-black/25 flex justify-end items-center" @click.self="cart.handleState">
        <div class="bg-white w-96 h-full py-2 px-3 pr-0 flex flex-col">
            <div class="flex">
                <button class="hover:bg-black/10 flex justify-center items-center px-1 rounded-full" @click="cart.handleState"><i class="bx bx-x text-2xl"></i></button>
            </div>
            <p class="text-3xl mb-4">Carts</p>
            <div class="flex flex-col gap-6 h-full pr-2 overflow-y-scroll">
                <div v-if="err && !pending" class="flex flex-col justify-center items-center gap-4">
                    <p>Oops something wrong, try again</p>
                    <button class="rounded-md border border-primary px-3 py-1 font-medium hover:bg-primary transition-all hover:text-white duration-150" @click="refresh">
                        Try again
                    </button>
                </div>
                <div v-if="!cart.carts.length && !pending" class="flex flex-col justify-center items-center">
                    <i class="bx bx-cart-alt text-5xl"></i>                    
                    <p>
                        Carts is empty
                    </p>
                </div>
                <template v-else>
                    <CartCard v-for="cart in cart.carts" :key="cart.id" :cart="cart" />
                </template>
                <div ref="fetchPoint"></div>
                <template v-if="cart.hasNext || pending">
                    <CartSkeleton v-for="i in 5" :key="i" />
                </template>
            </div>
            <div class="w-full pr-2 pt-2">
                <NuxtLink :to="{name: 'checkout'}" @click="cart.handleState" class="w-full block text-center bg-secondary font-medium text-white py-2 hover:bg-primary transition-colors duration-150">Checkout</NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
const cart = useCart();
const fetchPoint = ref(undefined);
const err = ref(null);
const pending = ref(false);

onMounted(() => {
    useScroll(fetchPoint.value, async () => {
        if (cart.hasNext && !pending.value) {
            pending.value = true;
            const { data, error } = await cart.getCarts();
            err.value = error.value;
            pending.value = false;
        }
    });
});
</script>