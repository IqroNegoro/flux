<template>
    <div class="overflow-x-hidden">
        <Navbar />
        <slot />
    </div>
    <Cart v-if="user.authenticated && cart" />
    <Login v-if="!user.authenticated && cart" />
</template>
<script setup>
const user = useUser();
const cart = useCart();
</script>