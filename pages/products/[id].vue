<template>
    <div class="flex justify-center w-full md:w-3/4 mx-auto flex-col p-4">
        <ProductPageSkeleton v-if="pending" />
        <div v-else-if="error" class="flex justify-center items-center flex-col gap-2">
            <h1>Something wrong, try again</h1>
            <button class="hover px-4 py-1 text-white" @click="refresh">Refresh</button>
        </div>
        <div v-else-if="!product" class="flex justify-center items-center flex-col gap-2">
            <h1>Oops cannot found the product</h1>    
            <NuxtLink to="/" class="hover px-4 py-1 text-white">Home</NuxtLink>
        </div>
        <template v-else>
            <div class="flex flex-col md:flex-row">
                <div class="flex flex-col md:w-[40rem] gap-2">
                    <img :src="product.image" :alt="product.name" fetchpriority="high" class="w-full rounded-md aspect-square object-center object-cover">
                    <div class="grid grid-cols-4 grid-rows-1 gap-2">
                        <button>
                            <img :src="product.image" :alt="product.name" class="rounded-md aspect-square object-center object-cover">
                        </button>
                        <button>
                            <img :src="product.image" :alt="product.name" class="rounded-md aspect-square object-center object-cover">
                        </button>
                        <button>
                            <img :src="product.image" :alt="product.name" class="rounded-md aspect-square object-center object-cover">
                        </button>
                        <button>
                            <img :src="product.image" :alt="product.name" class="rounded-md aspect-square object-center object-cover">
                        </button>
                    </div>
                </div>
                <div class="w-full flex flex-col gap-12 py-4 md:p-8">
                    <div class="flex flex-col gap-2">
                        <h1 class="text-lg md:text-4xl text-black font-semibold">{{ product.name }}</h1>
                        <h1 class="text-sm md:text-xl text-black font-medium">{{ product.sub }}</h1>
                        <p class="text-sm md:text-xl">{{ formatRp(product.price) }}</p>
                    </div>
                    <div class="flex flex-col gap-1">
                        <p class="text-xl">Product Description</p>
                        <div ref="descriptionContainer" @click="handleOverflowing" class="line-clamp-6 text-gray-500 font-light whitespace-pre-line" v-html="product.description"></div>
                        <button @click="handleOverflowing" v-if="isOverflowing && !showLess" class="w-max font-medium text-primary">Read More...</button>
                    </div>
                    <button class="p-2 h-12 md:w-48 flex justify-center items-center bg-secondary hover:bg-primary transition-colors duration-150 font-medium text-white rounded-sm" @click="user.authenticated ? handleAdd() : unauthenticated = true">
                        <i v-if="cartPending" class="bx bx-loader-alt bx-spin"></i>
                        <p v-else>
                            Add to cart
                        </p>
                    </button>
                </div>
            </div>
            <div class="w-full flex justify-center items-center flex-col gap-4">
                <h1 class="font-semibold text-lg md:text-2xl">Reviews</h1>
                <p class="text-center">Confused? Look at this product review so you can be sure</p>
                <button class="hover w-max px-4 py-2 mx-auto" @click="executeReviews" v-if="statusRatings == 'idle' || statusRatings == 'pending' || errorRatings">
                    <i v-if="pendingRatings" class="bx bx-loader-alt bx-spin"></i>
                    <p v-else>
                        See Reviews
                    </p>
                </button>
                <p v-if="errorRatings">Something wrong, try again</p>
                <div class="w-full md:h-80 flex justify-center items-center flex-col md:flex-row font-semibold text-slate-500 gap-12" v-if="statusRatings != 'idle' && statusRatings != 'pending' && !pendingRatings && !errorRatings">
                    <div class="w-full flex flex-col gap-2 self-start">
                        <div class="flex flex-row gap-2">
                            <p>Based on {{ reviewTotals ?? 0 }} reviews</p>
                        </div>
                        <div class="flex justify-center items-center flex-row gap-2">
                            <p>5</p>
                            <div class="flex justify-center items-center flex-row">
                                <i class="bx bxs-star text-yellow-500"></i>
                            </div>
                            <div class="bg-black/10 w-full rounded-md h-2">
                                <div class="bg-yellow-500 h-full rounded-md" :style="{width: (ratings?.ratings.find(v => v.rate == 5)?.avg ?? 0) + '%'}"></div>
                            </div>
                            <p>{{ ratings?.ratings.find(v => v.rate == 5)?.avg ?? 0 }}%</p>
                        </div>
                        <div class="flex justify-center items-center flex-row gap-2">
                            <p>4</p>
                            <div class="flex justify-center items-center flex-row">
                                <i class="bx bxs-star text-yellow-500"></i>
                            </div>
                            <div class="bg-black/10 w-full rounded-md h-2">
                                <div class="bg-yellow-500 h-full rounded-md" :style="{width: (ratings?.ratings.find(v => v.rate == 4)?.avg ?? 0) + '%'}"></div>
                            </div>
                            <p>{{ ratings?.ratings.find(v => v.rate == 4)?.avg ?? 0 }}%</p>
                        </div>
                        <div class="flex justify-center items-center flex-row gap-2">
                            <p>3</p>
                            <div class="flex justify-center items-center flex-row">
                                <i class="bx bxs-star text-yellow-500"></i>
                            </div>
                            <div class="bg-black/10 w-full rounded-md h-2">
                                <div class="bg-yellow-500 h-full rounded-md" :style="{width: (ratings?.ratings.find(v => v.rate == 3)?.avg ?? 0) + '%'}"></div>
                            </div>
                            <p>{{ ratings?.ratings.find(v => v.rate == 3)?.avg ?? 0 }}%</p>
                        </div>
                        <div class="flex justify-center items-center flex-row gap-2">
                            <p>2</p>
                            <div class="flex justify-center items-center flex-row">
                                <i class="bx bxs-star text-yellow-500"></i>
                            </div>
                            <div class="bg-black/10 w-full rounded-md h-2">
                                <div class="bg-yellow-500 h-full rounded-md" :style="{width: (ratings?.ratings.find(v => v.rate == 2)?.avg ?? 0) + '%'}"></div>
                            </div>
                            <p>{{ ratings?.ratings.find(v => v.rate == 2)?.avg ?? 0 }}%</p>
                        </div>
                        <div class="flex justify-center items-center flex-row gap-2">
                            <p>1</p>
                            <div class="flex justify-center items-center flex-row">
                                <i class="bx bxs-star text-yellow-500"></i>
                            </div>
                            <div class="bg-black/10 w-full rounded-md h-2">
                                <div class="bg-yellow-500 h-full rounded-md" :style="{width: (ratings?.ratings.find(v => v.rate == 1)?.avg ?? 0) + '%'}"></div>
                            </div>
                            <p>{{ ratings?.ratings.find(v => v.rate == 1)?.avg ?? 0 }}%</p>
                        </div>
                    </div>
                    <div class="w-full h-96 md:h-full overflow-y-auto flex flex-col gap-6" v-if="ratings?.reviews.length">
                        <div class="flex flex-col gap-4" v-for="review in ratings?.reviews" :key="review.id">
                            <div class="flex items-center justify-between">
                                <div class="flex justify-center items-center flex-row gap-2">
                                    <p>{{ review.user.name }}</p>
                                </div>
                                <div>
                                    <i class="bx bx-star text-yellow-500" :class="{'bxs-star': review.rate >= 1}"></i><i class="bx bx-star text-yellow-500" :class="{'bxs-star': review.rate >= 2}"></i><i class="bx bx-star text-yellow-500" :class="{'bxs-star': review.rate >= 3}"></i><i class="bx bx-star text-yellow-500" :class="{'bxs-star': review.rate >= 4}"></i><i class="bx bx-star text-yellow-500" :class="{'bxs-star': review.rate >= 5}"></i>
                                </div>
                            </div>
                            <p class="text-sm font-light text-left">{{review.content}}</p>
                            <p class="text-xs font-light text-left"> {{ moment(review.createdAt).format("L") }} </p>
                        </div>
                    </div>
                    <p class="w-full self-start" v-else>This product doesn't have review yet</p>
                </div>
            </div>
        </template>
    </div>
</template>
<script setup>
import moment from "moment";

const user = useUser();
const unauthenticated = useUnauthenticated();
const notification = useNotification();
const { id } = useRoute().params

const { data: product, pending, error, refresh } = await getProduct(id);

const isOverflowing = ref(false);
const showLess = ref(false);
const descriptionContainer = ref(null);

const handleOverflowing = () => {
    descriptionContainer.value.classList.toggle("line-clamp-6");
    showLess.value = !showLess.value;
}

onMounted(() => {
    if (descriptionContainer.value?.clientHeight < descriptionContainer.value?.scrollHeight) {
        isOverflowing.value = true;
    }
})


const { data: ratings, status: statusRatings, pending: pendingRatings, error: errorRatings, execute: executeReviews } = await getRatings(id);
const reviewTotals = computed(() => ratings.value?.reviews.length);
pendingRatings.value = false;

const { data: cart, pending: cartPending, error: errorCart, execute: executeCart } = await addToCart(id);
cartPending.value = false;

const handleAdd = async () => {
    await executeCart();

    if (errorCart.value) {
        if (errorCart.value.statusCode == 409) {
            notification.error(errorCart.value.data.message);
            return;
        }
        notification.error("Something wrong, try again");
        return;
    }
    notification.success("Item added to cart")
}

useHead({
    title: () => `${product.value?.name || ""} | Flux`
});

useSeoMeta({
    title: () => `${product.value?.name || ""} | Flux`,
    ogImage: () => product.value?.image || "",
    ogImageAlt: () => product.value?.name || "",
    ogTitle: () => `${product.value?.name || ""}`,
    twitterTitle: () => `${product.value?.name || ""}`,
    description: () => product.value?.description || "",
    ogDescription: () => product.value?.description || "",
    twitterDescription: () => product.value?.description || "",
    ogType: "website",
    ogSiteName: "Flux",
    applicationName: "Flux",
    twitterCard: "app",
    twitterImage: () => product.value?.images || "",
})
</script>