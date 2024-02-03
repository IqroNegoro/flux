<template>
    <div class="flex justify-center items-center flex-col gap-2 p-4 w-full lg:w-3/4 mx-auto">
        <h1 class="font-bold text-4xl">Shopping Cart</h1>
        <p class="text-xl"> Make sure nothing left </p>
        <div class="w-full flex justify-center flex-col md:flex-row items-center md:items-start gap-8 lg:grid lg:grid-cols-2 lg:grid-rows-2">
            <div class="w-full flex flex-col gap-4 rounded-sm">
                <p class="text-xl font-medium">Products</p>
                <CartCheckoutCard v-for="cart in checkout.items" :key="cart.id" :cart="cart" />
            </div>
            <div class="w-full flex flex-col gap-8">
                <h1 class="font-medium text-xl">Purchase Total: {{ formatRp(total) }} </h1>
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
                    <p class="text-red-500" v-if="errors.payment_type">{{ errors.payment_type }}</p> 
                </div>
                <div class="flex flex-col gap-2">
                    <h1 class="font-medium text-xl">Choose Payment Provider</h1>
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
                    <p class="text-red-500" v-if="errors.payment_provider">{{ errors.payment_provider }}</p> 
                </div>
                <div class="flex flex-col gap-2">
                    <h1 class="text-xl font-medium">Shipping Address</h1>
                    <input type="text" placeholder="Name" class="disabled:text-gray-500 font-medium border border-primary" v-model="first_name">
                    <p class="text-red-500" v-if="errors.first_name">{{ errors.first_name }}</p> 
                    <input type="text" placeholder="Email" class="disabled:text-gray-500 font-medium border border-primary" v-model="email">
                    <p class="text-red-500" v-if="errors.email">{{ errors.email }}</p> 
                    <input type="tel" placeholder="Phone" class="font-medium border border-primary" v-model="phone">
                    <p class="text-red-500" v-if="errors.phone">{{ errors.phone }}</p> 
                    <div class="w-full relative group">
                        <button class="w-full border border-primary font-medium text-left p-2" @click="!provinces.length ? executeProvince() : null">{{ shipping_province?.province || "Choose Province" }}</button>
                        <div class="hidden z-10 group-focus-within:flex w-full absolute top-full left-0 flex-col border border-primary bg-white h-48 overflow-y-auto" :class="{'justify-center items-center': pendingProvince}">
                            <i v-if="pendingProvince" class="bx bx-loader-alt bx-spin text-5xl"></i>
                            <template v-else>
                                <button v-for="province in provinces" class="text-left p-2 font-medium hover:bg-primary hover:text-white duration-75 transition-colors" :class="{'bg-primary text-white': shipping_province?.province_id == province.province_id}" :key="province.province_id" @click="shipping_province = province">{{ province.province }}</button>
                            </template>
                        </div>
                    </div>
                    <p class="text-red-500" v-if="errors.shipping_province">{{ errors.shipping_province }}</p> 
                    <div class="w-full relative" :class="{'group': shipping_province}">
                        <button class="w-full border border-primary font-medium text-left p-2">{{ shipping_city ? `${shipping_city?.type} ${shipping_city?.city_name}` : "Choose City" }}</button>
                        <div class="hidden z-10 group-focus-within:flex w-full absolute top-full left-0 flex-col border border-primary bg-white h-48 overflow-y-auto" :class="{'justify-center items-center': pendingCity}">
                            <i v-if="pendingCity" class="bx bx-loader-alt bx-spin text-5xl"></i>
                            <template v-else>
                                <button v-for="city in cities" class="text-left p-2 font-medium hover:bg-primary hover:text-white duration-75 transition-colors" :class="{'bg-primary text-white': shipping_city?.city_id == city.city_id}" :key="city.city_id" @click="shipping_city = city">{{ `${city.type} ${city.city_name}` }}</button>
                            </template>
                        </div>
                    </div>
                    <p class="text-red-500" v-if="errors.shipping_city">{{ errors.shipping_city }}</p> 
                    <input type="number" placeholder="Postal Code" class="font-medium border border-primary" v-model="postal_code">
                    <p class="text-red-500" v-if="errors.postal_code">{{ errors.postal_code }}</p> 
                    <input type="text" placeholder="Detail Address" class="font-medium border border-primary" v-model="address">
                    <p class="text-red-500" v-if="errors.address">{{ errors.address }}</p> 
                </div>
                <button class="bg-secondary py-2 hover:bg-primary font-medium w-full text-white" @click="handleCreateOrder" :disabled="pending">
                    <i v-if="pending" class="bx bx-loader-alt bx-spin"></i>
                    <p v-else>
                        Checkout
                    </p>
                </button>
            </div>
        </div>
        <div class="w-full p-4 flex flex-col gap-4">
        </div>
    </div>
</template>
<script setup>
import { toTypedSchema } from "@vee-validate/yup";
import { object, string, number } from "yup";

const user = useUser();
const checkout = useCheckout();
const notification = useNotification();

const { values, defineField, validate, errors, setErrors } = useForm({
    validationSchema: toTypedSchema(object({
        payment_type: string().required("Please select Payment Type"),
        payment_provider: string().required("Please select Payment Provider"),
        first_name: string().required("Please fill your name"),
        email: string().required("Please fill a email").email("Please fill a correct email"),
        phone: number().required("Please fill the phone number"),
        shipping_province: object().required("Please select your province address"),
        shipping_city: object().required("Please select your city address"),
        postal_code: number().required("Please fill your postal code"),
        address: string().required("Please fill your address")
    })),
    initialValues: {
        payment_type: "bank_transfer",
        first_name: user.name ?? "",
        email: user.email ?? ""
    }
})

const validateType = {
    validateOnBlur: false,
    validateOnChange: false,
    validateOnModelUpdate: false,
    validateOnInput: false
}

const [payment_type] = defineField("payment_type", validateType);
const [payment_provider] = defineField("payment_provider", validateType);
const [first_name] = defineField("first_name", validateType);
const [email] = defineField("email", validateType);
const [phone] = defineField("phone", validateType);
const [shipping_province] = defineField("shipping_province", validateType);
const [shipping_city] = defineField("shipping_city", validateType);
const [postal_code] = defineField("postal_code", validateType);
const [address] = defineField("address", validateType);

const pending = ref(false);
const err = ref(false);
const inputErr = ref(false);

const total = computed(() => checkout.items.reduce((prev, next) => prev + (next.product?.price * next.quantity),0));

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
    shipping_city.value = "";
});

const handleCreateOrder = async () => {
    if (pending.value) return;
    pending.value = true;

    const validating = await validate();

    if (!validating.valid) {
        pending.value = false;
        return;
    }

    const { data, error } = await createOrder({
        payment_type: payment_type.value,
        payment_provider: payment_provider.value,
        items: JSON.parse(JSON.stringify(checkout.items)),
        total: total.value,
        address: address.value,
        shipping_address: {
            first_name: first_name.value,
            email: email.value,
            phone: phone.value,
            province: shipping_province.value.province,
            city: shipping_city.value,
            postal_code: postal_code.value,
            address: address.value
        }
    });

    pending.value = false;
    
    if (error.value) {
        if (error.value.statusCode === 409) {
            notification.error(error.value.data.message);
            return;
        }
        if (error.value.statusCode === 400) {
            notification.error("Cannot create order with choosed payment, please use another payment provider")
            return;
        }
        err.value = error.value.data;
        notification.error("Error creating your order, try again")
        return;
    }

    notification.success("Order created");
    checkout.clear();
    return await navigateTo({name: "orders-id", params: {id: data.value.data}})
    
}

onUnmounted(() => {
    user.checkout = [];
});

useHead({
    title: "Checkout | Flux"
})
</script>