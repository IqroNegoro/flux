<template>
    <div class="flex justify-center w-full md:w-3/4 mx-auto flex-col p-4">
        <ProductPageSkeleton v-if="pending" />
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
                <div class="w-full md:h-80 flex justify-center items-center flex-col md:flex-row font-semibold text-slate-500 gap-12">
                    <div class="w-full flex flex-col gap-2">
                        <div class="flex flex-row gap-2">
                            <p>5.0</p>
                            <div class="flex justify-center items-center flex-row">
                                <i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i>
                            </div>
                            <p>Based on 6 reviews</p>
                        </div>
                        <div class="flex justify-center items-center flex-row gap-2">
                            <p>5</p>
                            <div class="flex justify-center items-center flex-row">
                                <i class="bx bxs-star text-yellow-500"></i>
                            </div>
                            <div class="bg-black/10 w-full rounded-md h-2">
                                <div class="bg-yellow-500 h-full rounded-md w-1/2"></div>
                            </div>
                            <p>50%</p>
                        </div>
                        <div class="flex justify-center items-center flex-row gap-2">
                            <p>4</p>
                            <div class="flex justify-center items-center flex-row">
                                <i class="bx bxs-star text-yellow-500"></i>
                            </div>
                            <div class="bg-black/10 w-full rounded-md h-2">
                                <div class="bg-yellow-500 h-full rounded-md w-1/2"></div>
                            </div>
                            <p>50%</p>
                        </div>
                        <div class="flex justify-center items-center flex-row gap-2">
                            <p>3</p>
                            <div class="flex justify-center items-center flex-row">
                                <i class="bx bxs-star text-yellow-500"></i>
                            </div>
                            <div class="bg-black/10 w-full rounded-md h-2">
                                <div class="bg-yellow-500 h-full rounded-md w-1/2"></div>
                            </div>
                            <p>50%</p>
                        </div>
                        <div class="flex justify-center items-center flex-row gap-2">
                            <p>2</p>
                            <div class="flex justify-center items-center flex-row">
                                <i class="bx bxs-star text-yellow-500"></i>
                            </div>
                            <div class="bg-black/10 w-full rounded-md h-2">
                                <div class="bg-yellow-500 h-full rounded-md w-1/2"></div>
                            </div>
                            <p>50%</p>
                        </div>
                        <div class="flex justify-center items-center flex-row gap-2">
                            <p>1</p>
                            <div class="flex justify-center items-center flex-row">
                                <i class="bx bxs-star text-yellow-500"></i>
                            </div>
                            <div class="bg-black/10 w-full rounded-md h-2">
                                <div class="bg-yellow-500 h-full rounded-md w-1/2"></div>
                            </div>
                            <p>50%</p>
                        </div>
                    </div>
                    <div class="w-full h-96 md:h-full overflow-y-auto flex flex-col gap-6">
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center justify-between">
                                <div class="flex justify-center items-center flex-row gap-2">
                                    <img src="https://cdn.discordapp.com/attachments/1190176942293520454/1202657665189158943/received_885929163072385.jpeg?ex=65ce413b&is=65bbcc3b&hm=81d0450d175e68394eee8728ca11338e132eb449fe3547decddc0de255a70f0b&" alt="" class="w-12 h-12 md:w-16 md:h-16 object-fit object-center rounded-full aspect-square">
                                    <p>Iqro Negoro</p>
                                </div>
                                <div>
                                    <i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i>
                                </div>
                            </div>
                            <p class="text-sm font-light text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur voluptatibus nemo eum reprehenderit exercitationem. Modi quas impedit laboriosam sint architecto error explicabo accusantium placeat nihil, reprehenderit ad recusandae dolorem similique libero facere tenetur repellendus, omnis nesciunt esse a eveniet id nemo! Repellat laborum ipsum distinctio aperiam corrupti id consequatur doloremque?</p>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center justify-between">
                                <div class="flex justify-center items-center flex-row gap-2">
                                    <img src="https://cdn.discordapp.com/attachments/1190176942293520454/1202657665189158943/received_885929163072385.jpeg?ex=65ce413b&is=65bbcc3b&hm=81d0450d175e68394eee8728ca11338e132eb449fe3547decddc0de255a70f0b&" alt="" class="w-12 h-12 md:w-16 md:h-16 object-fit object-center rounded-full aspect-square">
                                    <p>Iqro Negoro</p>
                                </div>
                                <div>
                                    <i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i>
                                </div>
                            </div>
                            <p class="text-sm font-light text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur voluptatibus nemo eum reprehenderit exercitationem. Modi quas impedit laboriosam sint architecto error explicabo accusantium placeat nihil, reprehenderit ad recusandae dolorem similique libero facere tenetur repellendus, omnis nesciunt esse a eveniet id nemo! Repellat laborum ipsum distinctio aperiam corrupti id consequatur doloremque?</p>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center justify-between">
                                <div class="flex justify-center items-center flex-row gap-2">
                                    <img src="https://cdn.discordapp.com/attachments/1190176942293520454/1202657665189158943/received_885929163072385.jpeg?ex=65ce413b&is=65bbcc3b&hm=81d0450d175e68394eee8728ca11338e132eb449fe3547decddc0de255a70f0b&" alt="" class="w-12 h-12 md:w-16 md:h-16 object-fit object-center rounded-full aspect-square">
                                    <p>Iqro Negoro</p>
                                </div>
                                <div>
                                    <i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i>
                                </div>
                            </div>
                            <p class="text-sm font-light text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur voluptatibus nemo eum reprehenderit exercitationem. Modi quas impedit laboriosam sint architecto error explicabo accusantium placeat nihil, reprehenderit ad recusandae dolorem similique libero facere tenetur repellendus, omnis nesciunt esse a eveniet id nemo! Repellat laborum ipsum distinctio aperiam corrupti id consequatur doloremque?</p>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center justify-between">
                                <div class="flex justify-center items-center flex-row gap-2">
                                    <img src="https://cdn.discordapp.com/attachments/1190176942293520454/1202657665189158943/received_885929163072385.jpeg?ex=65ce413b&is=65bbcc3b&hm=81d0450d175e68394eee8728ca11338e132eb449fe3547decddc0de255a70f0b&" alt="" class="w-12 h-12 md:w-16 md:h-16 object-fit object-center rounded-full aspect-square">
                                    <p>Iqro Negoro</p>
                                </div>
                                <div>
                                    <i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i>
                                </div>
                            </div>
                            <p class="text-sm font-light text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur voluptatibus nemo eum reprehenderit exercitationem. Modi quas impedit laboriosam sint architecto error explicabo accusantium placeat nihil, reprehenderit ad recusandae dolorem similique libero facere tenetur repellendus, omnis nesciunt esse a eveniet id nemo! Repellat laborum ipsum distinctio aperiam corrupti id consequatur doloremque?</p>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center justify-between">
                                <div class="flex justify-center items-center flex-row gap-2">
                                    <img src="https://cdn.discordapp.com/attachments/1190176942293520454/1202657665189158943/received_885929163072385.jpeg?ex=65ce413b&is=65bbcc3b&hm=81d0450d175e68394eee8728ca11338e132eb449fe3547decddc0de255a70f0b&" alt="" class="w-12 h-12 md:w-16 md:h-16 object-fit object-center rounded-full aspect-square">
                                    <p>Iqro Negoro</p>
                                </div>
                                <div>
                                    <i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i><i class="bx bxs-star text-yellow-500"></i>
                                </div>
                            </div>
                            <p class="text-sm font-light text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur voluptatibus nemo eum reprehenderit exercitationem. Modi quas impedit laboriosam sint architecto error explicabo accusantium placeat nihil, reprehenderit ad recusandae dolorem similique libero facere tenetur repellendus, omnis nesciunt esse a eveniet id nemo! Repellat laborum ipsum distinctio aperiam corrupti id consequatur doloremque?</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script setup>
const user = useUser();
const unauthenticated = useUnauthenticated();
const notification = useNotification();
const { id } = useRoute().params

const isOverflowing = ref(false);
const showLess = ref(false);
const descriptionContainer = ref(null);

const handleOverflowing = () => {
    descriptionContainer.value.classList.toggle("line-clamp-6");
    showLess.value = !showLess.value;
}

onMounted(() => {
    if (descriptionContainer.value.clientHeight < descriptionContainer.value.scrollHeight) {
        isOverflowing.value = true;
    }
})

const { data: product, pending, error, refresh } = await getProduct(id);

const { data: cart, pending: cartPending, error: errorCart, execute: executeCart } = await addToCart(id);
cartPending.value = false;

const handleAdd = async () => {
    await executeCart();

    if (errorCart.value) {
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