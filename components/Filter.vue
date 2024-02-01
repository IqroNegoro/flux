<template>
    <div class="fixed top-0 left-0 bg-black/50 w-full h-[100dvh] z-20" @click.self="$emit('closeFilter')">
        <div class="md:w-96 w-full h-full bg-white p-2 flex flex-col justify-between">
            <div class="flex justify-between">
                <h1 class="font-semibold tracking-wide text-xl">Filter products</h1>
                <button class="hover:bg-black/25 px-2 py-1 rounded-full flex justify-center items-center" @click="$emit('closeFilter')">
                    <i class="bx bx-x text-xl"></i>
                </button>
            </div>
            <div class="flex flex-col gap-2 p-4 h-full overflow-y-auto">
                <div class="flex flex-col gap-2">
                    <p class="text-lg font-medium">Sort by</p>
                    <div class="flex flex-row gap-2 text-sm font-medium pb-2 flex-wrap">
                        <button class="border border-primary rounded-sm px-3 py-1" :class="{'bg-primary text-white': filter.orderBy == 'createdAt'}" @click="filter.orderBy = 'createdAt', filter.type = 'desc'">
                            Newest
                        </button>
                        <button class="border border-primary rounded-sm px-3 py-1" :class="{'bg-primary text-white': filter.orderBy == 'price' && filter.type == 'desc'}" @click="filter.orderBy = 'price', filter.type = 'desc'">
                            Highest price
                        </button>
                        <button class="border border-primary rounded-sm px-3 py-1" :class="{'bg-primary text-white': filter.orderBy == 'price' && filter.type == 'asc'}" @click="filter.orderBy = 'price', filter.type = 'asc'">
                            Lower price
                        </button>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <p class="text-lg font-medium">Price</p>
                    <div class="flex justify-center items-center flex-row gap-2 font-medium pb-2">
                        <div class="flex flex-row justify-center items-center gap-1 bg-black/10 px-2 text-sm">
                            <p class="font-medium">Rp</p>
                            <input type="number" class="w-full bg-transparent" placeholder="Lowest" v-model="filter.lowest">
                        </div>
                        -
                        <div class="flex flex-row justify-center items-center gap-1 bg-black/10 px-2 text-sm">
                            <p class="font-medium">Rp</p>
                            <input type="number" class="w-full bg-transparent" placeholder="Highest" v-model="filter.highest">
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <p class="text-lg font-medium">Category</p>
                    <div class="flex flex-row items-center gap-2 font-medium pb-2 overflow-x-auto">
                        <i v-if="pendingCategories" class="bx bx-loader-alt bx-spin"></i>
                        <template v-else>
                            <button class="border border-primary rounded-sm px-3 py-1" :class="{'bg-primary text-white': filter.categoryIds == category.id}" v-for="category in categories.data" :key="category.id" @click="filter.categoryIds == category.id ? filter.categoryIds = '' : filter.categoryIds = category.id">
                                {{ category.name }}
                            </button>
                        </template>
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <button class="text-white font-medium w-full py-3 text-center rounded-sm hover" @click="$emit('setFilter', filter)">
                    Apply
                </button>
                <button class="text-white font-medium w-full py-3 text-center rounded-sm hover" @click="reset">
                    Reset
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(["closeFilter", "setFilter", "resetFilter"])

const { data: categories, pending: pendingCategories } = await getCategories();

const filter = ref({
    orderBy: "",
    highest: 0,
    lowest: 0,
    categoryIds: "",
    type: "asc"
});

const reset = () => {
    filter.value.orderBy = "";
    filter.value.highest = 0,
    filter.value.lowest = 0,
    filter.value.categoryIds = "";
    filter.value.type = "asc";
    emit("resetFilter")
}
</script>