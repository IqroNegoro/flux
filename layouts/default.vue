<template>
    <div class="overflow-x-hidden min-h-screen w-full">
        <Navbar @search="searchStatus = true" />
        <slot />
    </div>
    <div class="w-full h-16 flex justify-center items-center text-xs font-medium">
        &copy; Iqro Negoro, All righs reserved
    </div>
    <ProductSearch v-if="searchStatus" @close-search="searchStatus = false" />
    <Cart v-if="user.authenticated && unauthenticated" />
    <Login v-if="!user.authenticated && unauthenticated" />
</template>
<script setup>
const user = useUser();
const unauthenticated = useUnauthenticated();
const searchStatus = ref(false);
</script>