<template>
    <div class="flex flex-col gap-4 p-2 relative" :class="{'w-full': $route.name != 'orders', 'shrink-0': $route.name == 'orders'}">
        <div class="flex flex-row gap-4 p-2 w-full">
            <NuxtLink :to="{name: 'products-id', params: {id: product?.id}}" class="w-48">
                <img :src="product?.images[0]" :alt="product?.name" class="w-full aspect-square object-cover object-center rounded-md">
            </NuxtLink>
            <div class="flex flex-col justify-between items-start w-full" v-if="$route.name != 'orders'">
                <div>
                    <p class="font-medium truncate">
                        {{ product?.name }}
                    </p>
                    <p class="text-gray-500 text-sm">
                        x{{ product.quantity }}
                    </p>
                </div>
                <div class="flex flex-col">
                    <span class="text-sm text-gray-500">{{ formatRp(product?.price) }}</span>
                    <span class="text-sm text-gray-500">{{ formatRp(product?.price * product.quantity) }}</span>
                </div>
            </div>
        </div>
        <div v-if="status === 'SUCCESS' && !product.isRated" class="flex flex-col gap-2">
            <div class="flex flex-row justify-between">
                <div class="flex justify-center items-center">
                    <p class="font-medium pr-2">
                        {{ rate }}
                    </p>
                    <button @click="rate = 1">
                        <i class="bx bx-star text-yellow-500" :class="{'bxs-star': rate >= 1}"></i>
                    </button>
                    <button @click="rate == 2 ? rate -= 1 : rate = 2">
                        <i class="bx bx-star text-yellow-500" :class="{'bxs-star': rate >= 2}"></i>
                    </button>
                    <button @click="rate == 3 ? rate -= 1 : rate = 3">
                        <i class="bx bx-star text-yellow-500" :class="{'bxs-star': rate >= 3}"></i>
                    </button>
                    <button @click="rate == 4 ? rate -= 1 : rate = 4">
                        <i class="bx bx-star text-yellow-500" :class="{'bxs-star': rate >= 4}"></i>
                    </button>
                    <button @click="rate == 5 ? rate -= 1 : rate = 5">
                        <i class="bx bx-star text-yellow-500" :class="{'bxs-star': rate >= 5}"></i>
                    </button>
                </div>
                <button class="hover py-1 w-24" @click="handleSendReview">
                    <i v-if="pending" class="bx bx-loader-alt bx-spin"></i>
                    <p v-else>
                        Send
                    </p>
                </button>
            </div>
            <p v-if="product.isRated">This product has been rated</p>
            <div class="peer cursor-text text-sm font-medium" contenteditable placeholder="Review" @input="({target}) => content = target.innerText"></div>
            <p class="hidden peer-focus:block text-red-500 text-xs font-medium">Your reviews cannot be deleted after you sent it</p>
        </div>
    </div>
</template>
<script setup>
const { product, status } = defineProps(["product", "status"]);
const { id } = useRoute().params;
const emit = defineEmits(["rated"]);
const notification = useNotification();

const content = ref("");
const rate = ref(5);
const pending = ref(false);

const handleSendReview = async () => {
    if (pending.value) return;

    pending.value = true;

    const { data, error } = await sendReviews(id, {
        productId: product.id,
        content: content.value,
        rate: rate.value
    });
    
    pending.value = false;

    if (error.value) {
        notification.error("Something wrong when sending rating");
        return;
    }
    
    notification.success("Review Sended");

    emit("rated", data.value);
}
</script>