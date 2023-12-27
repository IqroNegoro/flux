<template>
    <div>
        <Navbar />
        <Cart v-if="user.authenticated" />
        <slot />
    </div>
</template>
<script setup>
const user = useUser();
</script>