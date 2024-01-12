<template>
    <div class="flex justify-center items-center flex-col gap-2 p-4 w-full lg:w-3/4 mx-auto">
        <h1 class="font-bold text-4xl">Shopping Cart</h1>
        <p class="text-xl"> Make sure nothing left </p>
        <div class="w-full flex justify-center flex-col md:flex-row items-center md:items-start gap-8">
            <div class="w-full flex flex-col gap-4">
                <CartCheckoutCard v-for="cart in checkout.checkout" :key="cart.id" :cart="cart" />
            </div>
            <div class="w-3/4 flex flex-col gap-8 max-md:order-first">
                <div class="w-full h-96 flex flex-col bg-gray-100 p-8 justify-between rounded-md">
                    <div>
                        <h1 class="text-xl font-medium">Order Summary</h1>
                        <table class="w-full table-fixed">
                            <tbody>
                                <tr class="font-medium">
                                    <td>Subtotal</td>
                                    <td>{{formatRp(total)}}</td>
                                </tr>
                                <tr class="font-medium">
                                    <td>Payment</td>
                                    <td>{{ capitalize(payment_provider) || '-' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button class="bg-secondary py-2 hover:bg-primary font-medium w-full text-white" @click="handleCreateOrder" :disabled="pending">
                        <i v-if="pending" class="bx bx-loader-alt bx-spin"></i>
                        <p v-else>
                            Checkout
                        </p>
                    </button>
                </div>
                <div class="flex flex-col gap-2">
                    <h1 class="text-xl font-medium">Choose Payment Method</h1>
                    <div class="flex flex-row justify-between">
                        <div class="flex flex-row gap-2">
                            <input id="bank_transfer" type="radio" name="payment_type" value="bank_transfer" v-model="payment_type" :checked="payment_type === 'bank_transfer'">
                            <label for="bank_transfer" class="font-medium">Bank Transfer</label>
                        </div>
                        <div class="flex flex-row gap-2">
                            <input id="ewallet" type="radio" name="payment_type" value="ewallet" v-model="payment_type" :checked="payment_type === 'ewallet'">
                            <label for="ewallet" class="font-medium">E-WALLET</label>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <h1 class="font-medium text-xl">Chooye Payment Provider</h1>
                    <div class="flex flex-col items-start gap-2" v-if="payment_type === 'bank_transfer'">
                        <div class="flex flex-row gap-2 items-center justify-center">
                            <input id="bri" type="radio" name="payment_provider" value="bri" v-model="payment_provider" :checked="payment_provider === 'bri'">
                            <label for="bri" class="font-medium flex">
                                <img src="/img/bri.png" alt="bri" class="w-16">
                            </label>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-center">
                            <input id="bca" type="radio" name="payment_provider" value="bca" v-model="payment_provider" :checked="payment_provider === 'bca'">
                            <label for="bca" class="font-medium flex">
                                <img src="/img/bca.png" alt="bca" class="w-16">
                            </label>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-center">
                            <input id="bni" type="radio" name="payment_provider" value="bni" v-model="payment_provider" :checked="payment_provider === 'bni'">
                            <label for="bni" class="font-medium flex">
                                <img src="/img/bni.png" alt="bni" class="w-16">
                            </label>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-center">
                            <input id="permata" type="radio" name="payment_provider" value="permata" v-model="payment_provider" :checked="payment_provider === 'permata'">
                            <label for="permata" class="font-medium-center">
                                <img src="/img/permata.png" alt="permata" class="w-16">
                            </label>
                        </div>
                    </div>
                    <div class="flex flex-col items-start gap-2" v-if="payment_type === 'ewallet'">
                        <div class="flex flex-row gap-2 items-center justify-center">
                            <input id="qris" type="radio" name="payment_provider" value="qris" v-model="payment_provider" :checked="payment_provider === 'qris'">
                            <label for="qris" class="font-medium-center">
                                <img src="/img/qris.png" alt="qris" class="w-16">
                            </label>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-center">
                            <input id="gopay" type="radio" name="payment_provider" value="gopay" v-model="payment_provider" :checked="payment_provider === 'gopay'">
                            <label for="gopay" class="font-medium-center">
                                <img src="/img/gopay.png" alt="gopay" class="w-16">
                            </label>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-center">
                            <input id="shopeepay" type="radio" name="payment_provider" value="shopeepay" v-model="payment_provider" :checked="payment_provider === 'shopeepay'">
                            <label for="shopeepay" class="font-medium-center">
                                <img src="/img/shopeepay.png" alt="shopeepay" class="w-16">
                            </label>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <h1 class="text-xl font-medium">Shipping Address</h1>
                    <input type="text" placeholder="Name" class="disabled:text-gray-500 font-medium border border-primary" v-model="shipping_address.first_name">
                    <input type="text" placeholder="Email" class="disabled:text-gray-500 font-medium border border-primary" v-model="shipping_address.email">
                    <input type="tel" placeholder="Phone" class="font-medium border border-primary" v-model="shipping_address.phone">
                    <div class="w-full relative group">
                        <button class="w-full border border-primary font-medium text-left p-2" @click="!provinces.length ? executeProvince() : null">{{ shipping_province?.province || "Choose Province" }}</button>
                        <div class="hidden z-10 group-focus-within:flex w-full absolute top-full left-0 flex-col border border-primary bg-white h-48 overflow-y-auto" :class="{'justify-center items-center': pendingProvince}">
                            <i v-if="pendingProvince" class="bx bx-loader-alt bx-spin text-5xl"></i>
                            <template v-else>
                                <button v-for="province in provinces" class="text-left p-2 font-medium hover:bg-primary hover:text-white duration-75 transition-colors" :class="{'bg-primary text-white': shipping_province.province_id == province.province_id}" :key="province.province_id" @click="shipping_province = province">{{ province.province }}</button>
                            </template>
                        </div>
                    </div>
                    <div class="w-full relative" :class="{'group': shipping_province}">
                        <button class="w-full border border-primary font-medium text-left p-2">{{ shipping_address.city ? `${shipping_address.city?.type} ${shipping_address.city?.city_name}` : "Choose City" }}</button>
                        <div class="hidden z-10 group-focus-within:flex w-full absolute top-full left-0 flex-col border border-primary bg-white h-48 overflow-y-auto" :class="{'justify-center items-center': pendingCity}">
                            <i v-if="pendingCity" class="bx bx-loader-alt bx-spin text-5xl"></i>
                            <template v-else>
                                <button v-for="city in cities" class="text-left p-2 font-medium hover:bg-primary hover:text-white duration-75 transition-colors" :class="{'bg-primary text-white': shipping_address.city.city_id == city.city_id}" :key="city.city_id" @click="shipping_address.city = city">{{ `${city.type} ${city.city_name}` }}</button>
                            </template>
                        </div>
                    </div>
                    <input type="number" placeholder="Postal Code" class="font-medium border border-primary" v-model="shipping_address.postal_code">
                    <input type="text" placeholder="Detail Address" class="font-medium border border-primary" v-model="shipping_address.address">
                </div>
            </div>
        </div>
        <div class="w-full p-4 flex flex-col gap-4">
           
        </div>
    </div>
</template>
<script setup>
const user = useUser();
const checkout = useCheckout();
const notification = useNotification();

const payment_type = ref("bank_transfer");
const payment_provider = ref("");

const pending = ref(false);
const err = ref(false);

const total = computed(() => checkout.checkout.reduce((prev, next) => prev + (next.product?.price * next.quantity),0));

const shipping_province = ref("");

const shipping_address = ref({
    first_name: user.name ?? "",
    email: user.email ?? "",
    phone: "",
    city: "",
    postal_code: "",
    address: ""
});

const { data: provinces, pending: pendingProvince, execute: executeProvince } = await useFetch("/api/province", {
    immediate: false,
    default: () => [],
    key: "get-province"
});

const { data: cities, pending: pendingCity } = await useFetch("/api/city", {
    immediate: false,
    default: () => [],
    query: {
        shipping_province
    },
    key: "get-city"
});

watch(shipping_province, val => {
    shipping_address.value.city = "";
});

const handleCreateOrder = async () => {
    pending.value = true;

    const { data, error } = await createOrder({
        payment_type: payment_type.value,
        payment_provider: payment_provider.value,
        items: checkout.checkout,
        total: total.value,
        address: shipping_address.value.address,
        shipping_address: {
            ...shipping_address.value,
            province: shipping_province.value.province,
            city: shipping_address.value.city.city_name,
        }
    });

    pending.value = false;
    
    if (error.value) {
        notification.error("Error creating your order, try again")
        console.log(error.value);
        return;
    }

    notification.success("Order created");

    return await navigateTo({name: "orders-id", params: {id: data.value.data}})
    
}

onUnmounted(() => {
    user.checkout = [];
});

useHead({
    title: "Checkout | Flux"
})
</script>