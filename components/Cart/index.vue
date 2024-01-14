<template>
    <div class="fixed top-0 left-0 w-full h-full bg-black/25 flex justify-end items-center" @click.self="unauthenticated = false">
        <div class="bg-white w-full md:w-96 h-full py-2 px-3 pr-0 flex flex-col">
            <div class="flex">
                <button class="hover:bg-black/10 flex justify-center items-center px-1 rounded-full" @click="unauthenticated = false"><i class="bx bx-x text-2xl"></i></button>
            </div>
            <p class="text-3xl mb-4">Carts</p>
            <div class="relative flex flex-col gap-3 h-full pr-2 overflow-y-scroll">
                <div v-if="error && !pending" class="flex flex-col justify-center items-center gap-4">
                    <p>Oops something wrong, try again</p>
                    <button class="rounded-md border border-primary px-3 py-1 font-medium hover:bg-primary transition-all hover:text-white duration-150" @click="refresh">
                        Try again
                    </button>
                </div>
                <div v-else-if="!cartLists.length && !pending" class="flex flex-col justify-center items-center">
                    <i class="bx bx-cart-alt text-5xl"></i>                    
                    <p>
                        Carts is empty
                    </p>
                </div>
                <template v-else>
                    <CartCard v-for="cart in cartLists" :key="cart.id" :cart="cart" @qty="cart => cartLists.find(v => v.id == cart.id).quantity = cart.quantity" @delete-cart="id => cartLists = cartLists.filter(v => v.id != id)" />
                </template>
                <div ref="fetchPoint"></div>
                <template v-if="data.length >= limit || pending">
                    <CartSkeleton v-for="i in 5" :key="i" />
                </template>
                <div class="absolute bottom-0 bg-primary font-medium text-white py-1 px-3 rounded-full">
                    {{ checkout.checkout.length }}
                </div>
            </div>
            <div class="w-full pr-2 pt-2">
                <p class="text-center font-medium text-sm">Click the item want to checkout</p>
                <NuxtLink :to="{name: 'checkout'}" @click="unauthenticated = false" :class="{'pointer-events-none bg-secondary': !checkout.checkout.length}" class="w-full block text-center font-medium text-white py-2 bg-primary transition-colors duration-150">
                    Checkout
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
const user = useUser();
const unauthenticated = useUnauthenticated();
const checkout = useCheckout();
const limit = ref(10);
const skip = ref(0);
const fetchPoint = ref(undefined);
const cartLists = ref([]);

const { data, pending, error, refresh } = await getCarts({
    params: {
        limit,
        skip
    }
});

watch(data, data => {
    console.log(data)
    cartLists.value = [...cartLists.value, ...data]
});

onMounted(() => {
    useScroll(fetchPoint.value, () => {
        if (!pending.value && data.value.length >= limit.value) {
            skip.value += limit.value
        }
    });
});
</script>