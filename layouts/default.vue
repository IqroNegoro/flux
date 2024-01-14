<template>
    <div class="overflow-x-hidden">
        <Navbar />
        <slot />
    </div>
    <Cart v-if="user.authenticated && unauthenticated" />
    <Login v-if="!user.authenticated && unauthenticated" />
</template>
<script setup>
const user = useUser();
const unauthenticated = useUnauthenticated();
</script>