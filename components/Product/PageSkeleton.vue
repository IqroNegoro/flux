<template>
    <div class="flex flex-col md:w-[40rem] gap-2">
        <div class="skeleton w-full rounded-md aspect-square object-center object-cover"></div>
        <div class="grid grid-cols-4 grid-rows-1 gap-2">
            <div class="w-full h-20 aspect-square skeleton rounded-md"></div>
            <div class="w-full h-20 aspect-square skeleton rounded-md"></div>
            <div class="w-full h-20 aspect-square skeleton rounded-md"></div>
            <div class="w-full h-20 aspect-square skeleton rounded-md"></div>
        </div>
    </div>
    <div class="w-full flex flex-col gap-12 py-4 md:p-8">
        <div class="flex flex-col gap-2">
            <h1 class="skeleton h-8 text-lg md:text-4xl text-black font-semibold"></h1>
            <h1 class="skeleton h-4 text-sm md:text-xl text-black font-medium"></h1>
        </div>
        <div class="flex flex-col gap-1">
            <p class="skeleton w-64 h-4 text-xl"></p>
            <p class="skeleton w-48 h-4"></p>
            <p class="skeleton w-36 h-4"></p>
            <p class="skeleton w-24 h-4"></p>
            <p class="skeleton w-12 h-4"></p>
        </div>
        <button class="p-2 h-12 md:w-48 flex justify-center items-center bg-secondary hover:bg-primary transition-colors duration-150 font-medium text-white rounded-sm skeleton"></button>
    </div>
</template>