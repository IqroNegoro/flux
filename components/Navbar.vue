<template>
    <div class="w-full h-16 shadow-sm flex justify-between items-center flex-row px-4">
        <NuxtLink :to="{ name: 'shop' }" class="text-primary font-bold tracking-widest">Flux</NuxtLink>
        <div class="flex flex-row justify-center items-center gap-2">
            <button type="submit" class="pr-1">
                <i class="text-2xl bx bx-search text-primary"></i>
            </button>
            <button @click="unauthenticated = true">
                <i class="text-2xl bx bxs-cart text-primary"></i>
            </button>
            <button v-if="!user.authenticated" @click="unauthenticated = true">
                <i class="text-2xl bx bx-package text-primary"></i>
            </button>
            <NuxtLink v-else :to="{ name: user.authenticated ? 'orders' : 'login' }">
                <i class="text-2xl bx bx-package text-primary"></i>
            </NuxtLink>
            <div class="max-md:hidden flex flex-row justify-center items-center gap-2 border-l pl-3"
                v-if="!user.authenticated">
                <NuxtLink :to="{ name: 'login' }"
                    class="rounded-md border border-secondary flex justify-center items-center px-4 py-1 font-semibold text-primary">
                    Login </NuxtLink>
                <NuxtLink :to="{ name: 'register' }"
                    class="rounded-md bg-primary flex justify-center items-center px-4 py-1 font-semibold text-white">
                    Register </NuxtLink>
            </div>
            <div class="max-md:hidden flex flex-row justify-center items-center gap-2 border-l pl-3" v-else>
                <p>{{ user.name }}</p>
                <button class="rounded-md bg-primary flex justify-center items-center px-4 py-1 font-semibold text-white"
                    @click="logout"> Logout </button>
            </div>
        </div>
    </div>
</template>
<script setup>
const user = useUser();
const unauthenticated = useUnauthenticated();
</script>