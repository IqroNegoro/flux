<template>
    <div class="overflow-x-hidden min-h-screen w-full">
        <Navbar />
        <slot />
    </div>
    <div class="w-full h-16 flex justify-center items-center text-xs font-medium">
        &copy; Iqro Negoro, All righs reserved
    </div>
    <Cart v-if="user.authenticated && unauthenticated" />
    <Login v-if="!user.authenticated && unauthenticated" />
</template>
<script setup>
const user = useUser();
const unauthenticated = useUnauthenticated();
</script>