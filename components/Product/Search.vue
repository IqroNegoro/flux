<template>
    <div class="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center" @click.self="$emit('closeSearch')">
        <div class="w-full h-full md:w-96 md:h-3/4 bg-white rounded-md flex flex-col p-4 gap-8">
            <div class="flex justify-between">
                <h1 class="font-medium text-2xl">Search product</h1>
                <button class="hover:bg-black/25 flex justify-center items-center rounded-full px-2" @click="$emit('closeSearch')">
                    <i class="bx bx-x"></i>
                </button>
            </div>
            <form class="flex flex-row">
                <input class="w-full rounded-l-sm" type="text" placeholder="Name product" v-model.trim="q">
                <button type="submit" class="h-full rounded-r-sm flex justify-center items-center px-3 hover"><i class="bx bx-search text-2xl"></i></button>
            </form>
            <div class="flex flex-col gap-4 overflow-y-auto">
                <div v-if="!pending && !productLists.length && q">
                    <p class="text-center">0 Match</p>
                </div>
                <template v-else>
                    <NuxtLink @click="$emit('closeSearch')" :to="{name: 'products-id', params: {id: product.id}}" class="flex flex-row gap-4 w-full" v-for="product in productLists" :key="product.id">
                        <img :src="product.images[0]" alt="" class="w-36 md:w-24 rounded-md aspect-square object-cover object-center">
                        <div class="flex flex-col justify-between items-start font-medium">
                            <div>
                                <p>{{ product.name }}</p>
                                <p class="font-light text-sm">{{ formatRp(product.price) }}</p>
                            </div>
                            <p class="text-sm line-clamp-1 text-ellipsis">{{ product.sub }}</p>
                        </div>
                    </NuxtLink>
                </template>
                <div ref="fetchPoint"></div>
                <template v-if="(pending && q) || data.length >= limit">
                    <div class="flex flex-row gap-4 w-full" v-for="i in 5" :key="i">
                        <div class="w-36 h-36 md:w-24 md:h-24 aspect-square skeleton rounded-md"></div>
                        <div class="w-full flex flex-col justify-between items-start">
                            <div class="flex flex-col gap-2 w-full">
                                <p class="skeleton h-4 w-full"></p>
                                <p class="skeleton h-4 w-24"></p>
                            </div>
                            <p class="skeleton h-4 w-full"></p>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(["closeSearch"]);
const limit = ref(10);
const c = ref("");
const q = ref("");
const productLists = ref([]);
const fetchPoint = ref("");

const { data, error, refresh, pending } = await searchProducts({
    params: {
        limit,
        c,
        q
    }
});

pending.value = false;

watch(q, q => {
    productLists.value = [];
    if (!q) {
        c.value = "";
    }
});

watch(data, data => {
    if (q.value) {
        productLists.value = [...productLists.value, ...data];
    }
});


onMounted(() => {
    useScroll(fetchPoint.value, () => {
        if (!pending.value && data.value.length >= limit.value) {
            c.value = data.value?.at(-1).createdAt;
        }
    });
})
</script>