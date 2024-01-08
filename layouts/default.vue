<template>
    <div>
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