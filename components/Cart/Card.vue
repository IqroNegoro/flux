<template>
    <div class="flex flex-row gap-4 p-2 w-full relative cursor-pointer rounded-md" :class="{'bg-gray-100': checkout.has(cart.id)}" @click="checkout.addToCheckout(cart)">
        <button class="absolute top-0 right-1" @click.stop="handleDelCart" :disabled="pending">
            <i v-if="pending" class="bx bx-loader-alt bx-spin"></i>
            <i v-else class="bx bx-x"></i>
        </button>
        <img :src="cart.product?.image" alt="" class="aspect-square w-32 object-cover rounded-md">
        <div class="flex flex-col justify-between items-start w-full">
            <div>
                <p class="font-medium text-lg">
                    {{ cart.product?.name }}
                </p>
                <p>
                    {{ cart.product?.description }}
                </p>
            </div>
            <span class="text-sm text-gray-500">{{formatRp(cart.product?.price)}}</span>
            <div class="flex justify-between items-center w-full">
                <button class="border border-primary px-2 rounded-sm font-bold" @click.stop="handleDec" :disabled="pending || pendingInc || pendingDec">
                    <i v-if="pendingDec" class="bx bx-loader-alt bx-spin"></i>
                    <i v-else class="bx bx-minus"></i>
                </button>
                {{ cart.quantity }}
                <button class="border border-primary px-2 rounded-sm font-bold" @click.stop="handleInc" :disabled="pending || pendingInc || pendingDec">
                    <i v-if="pendingInc" class="bx bx-loader-alt bx-spin"></i>
                    <i v-else class="bx bx-plus"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
const user = useUser();
const checkout = useCheckout();
const emit = defineEmits(["deleteCart", "qty"]);
const { cart } = defineProps(["cart"]);

const { data, pending, error, execute } = await deleteCart(cart.id);
const { data: inc, pending: pendingInc, error: errorInc, execute: executeInc} = await incQty(cart.id);
const { data: dec, pending: pendingDec, error: errorDec, execute: executeDec} = await decQty(cart.id);
pending.value = false;
pendingInc.value = false;
pendingDec.value = false;

const handleDelCart = async () => {
    await execute();
    // if (error.value) {
    //     console.log(error.value.data)
    // }
    checkout.delete(data.value.id);
    emit("deleteCart", data.value.id);
}

const handleInc = async () => {
    console.trace(cart.quantity, "increment")
    await executeInc();
    // if (errorInc.value) {
    //     console.trace(errorInc.value);
    // }
    checkout.qty(inc.value);
    emit("qty", inc.value);
}

const handleDec = async () => {
    console.trace(cart.quantity, "decrement")
    if (cart.quantity == 1) {
        return await handleDelCart();
    }
    await executeDec();
    // if (errorDec.value) {
        //     console.trace(errorDec.value);
        // }
    checkout.qty(dec.value);
    emit("qty", dec.value);
}

</script>