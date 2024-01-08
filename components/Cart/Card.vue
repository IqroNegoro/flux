<template>
    <div class="flex flex-row gap-4 w-full relative">
        <button class="absolute top-0 right-0">
            <i class="bx bx-x"></i>
        </button>
        <img :src="cart.product?.image" alt="" class="aspect-square w-32 object-cover rounded-md">
        <div class="flex flex-col justify-between items-start w-full">
            <div>
                <p class="font-medium text-lg">
                    {{ cart.product?.name }}
                </p>
                <p>
                    {{ cart.product.description }}
                </p>
            </div>
            <span class="text-sm text-gray-500">{{formatRp(cart.product?.price)}}</span>
            <div class="flex justify-between items-center w-full">
                <button class="border border-primary px-2 rounded-sm font-bold" @click="handleDec">-</button>
                {{ cart.quantity }}
                <button class="border border-primary px-2 rounded-sm font-bold" @click="handleInc">+</button>
            </div>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(["deleteCart"]);
const { cart } = defineProps(["cart"]);

const { data, pending, error, execute } = await deleteCart(cart.id);
const { data: inc, pending: pendingInc, error: errorInc, execute: executeInc} = await incQty(cart.id);
const { data: dec, pending: pendingDec, error: errorDec, execute: executeDec} = await decQty(cart.id);

const handleDelCart = async () => {
    await execute();
    // if (error.value) {
    //     console.log(error.value.data)
    // }
    emit("deleteCart", data.value.id);
}

const handleInc = async () => {
    await executeInc();
    // if (errorInc.value) {
    //     console.log(errorInc.value);
    // }
    cart.quantity = inc.value.quantity;
}

const handleDec = async () => {
    if (cart.quantity == 1) {
        return await handleDelCart();
    }
    await executeDec();
    // if (errorDec.value) {
    //     console.log(errorDec.value);
    // }
    cart.quantity = dec.value.quantity;
}

</script>