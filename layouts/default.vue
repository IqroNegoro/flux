<template>
    <div>
        <Navbar />
        <slot />
    </div>
    <Cart v-if="user.authenticated && cart.open" />
    <Login v-if="!user.authenticated && cart.open" />
</template>
<script setup>
const user = useUser();
const cart = useCart();
</script>