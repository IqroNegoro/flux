<template>
    <div class="w-full h-16 shadow-sm flex justify-between items-center flex-row px-4">
        <h1 class="text-primary font-bold text-3xl tracking-widest">Flux</h1>
        <div class="flex flex-row justify-center items-center gap-2">
            <form class="focus-within:border focus-within:border-primary flex flex-row justify-center items-center bg-gray-50 rounded-full p-1 px-3" @submit.prevent>
                <button type="submit" class="pr-1">
                    <i class="bx bx-search text-2xl text-primary"></i>
                </button>
                <input type="text" class="bg-transparent">
            </form>
            <button @click="cart = true">
                <i class="bx bxs-cart text-2xl text-primary"></i>
            </button>
            <div class="flex flex-row justify-center items-center gap-2 border-l pl-3" v-if="!user.authenticated">
                <NuxtLink :to="{name: 'login'}" class="text-sm rounded-md border border-secondary flex justify-center items-center px-4 py-1 font-semibold text-primary"> Login </NuxtLink>
                <NuxtLink :to="{name: 'register'}" class="text-sm rounded-md bg-primary flex justify-center items-center px-4 py-1 font-semibold text-white"> Register </NuxtLink>
            </div>
            <div class="flex flex-row justify-center items-center gap-2 border-l pl-3" v-else>
                <p>{{user.name}}</p>
                <button class="text-sm rounded-md bg-primary flex justify-center items-center px-4 py-1 font-semibold text-white" @click="logout"> Logout </button>
            </div>
        </div>
    </div>
</template>
<script setup>
const user = useUser();
const cart = useCart();
</script>