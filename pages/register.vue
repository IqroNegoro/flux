<template>
    <div class="w-full h-screen flex justify-center items-center bg-secondary">
        <div class="w-3/4 h-[80%] shadow-md rounded-sm bg-white grid grid-cols-1 md:grid-cols-2 grid-rows-1 p-4">
            <div class="max-md:hidden flex justify-center items-center">
                <i class="bx bxs-shopping-bag-alt text-7xl text-primary"></i>
            </div>
            <form class="flex flex-col gap-12 justify-center items-center" @submit.prevent="handleRegister">
                <h1 class="tracking-wider text-2xl text-primary text-center">Register</h1>
                <div class="flex flex-col gap-2 w-full">
                    <p class="">Name</p>
                    <div class="flex flex-row justify-center border-b items-center w-full p-1" :class="{'border-red-500': errors.name}">
                        <i class="bx bx-user text-2xl pr-1"></i>
                        <input type="text" class="w-full bg-transparent" placeholder="Enter Your Name" v-model="name">
                    </div>
                    <p class="text-xs" v-if="errors.name"> {{ errors.name }} </p>
                    <p class="">Email</p>
                    <div class="flex flex-row justify-center border-b items-center w-full p-1" :class="{'border-red-500': errors.email}">
                        <i class="bx bx-envelope text-2xl pr-1"></i>
                        <input type="text" class="w-full bg-transparent" placeholder="Enter Your Email" v-model="email">
                    </div>
                    <p class="text-xs" v-if="errors.email"> {{ errors.email }} </p>
                    <p class="">Password</p>
                    <div class="flex flex-row justify-center border-b items-center w-full p-1" :class="{'border-red-500': errors.password}">
                        <i class="bx bx-lock text-2xl pr-1"></i>
                        <input type="password" class="w-full bg-transparent" placeholder="Enter Your Password" v-model="password">
                    </div>
                    <p class="text-xs" v-if="errors.password"> {{ errors.password }} </p>
                    <p class="text-xs" v-if="errorRegister"> {{errorRegister}} </p>
                </div>
                <button class="disabled:cursor-not-allowed flex justify-center items-center w-full hover:bg-primary bg-secondary duration-150 rounded-sm text-white p-2" type="submit" @submit.prevent="handleRegister" :disabled="pendingRegister || !name || !email || !password">
                    <i v-if="pendingRegister" class='bx bx-loader-alt bx-spin' ></i>
                    <p v-else>
                        Register
                    </p>
                </button>
                <p class="max-md:text-center" >Already have account? <NuxtLink :to="{name: 'login'}" class="text-primary">Login</NuxtLink></p>
            </form>
        </div>
    </div>
</template>
<script setup>
import { toTypedSchema } from "@vee-validate/yup";
import {object, string} from "yup";

const { values, defineField, errors, setErrors, validate } = useForm({
    validationSchema: toTypedSchema(object({
        name: string().required(),
        email: string().required().email(),
        password: string().required()
    }))
})

const [name, nameAttr] = defineField("name", {
    validateOnBlur: false,
    validateOnChange: false,
    validateOnModelUpdate: false,
    validateOnInput: false
});

const [email, emailAttr] = defineField("email", {
    validateOnBlur: false,
    validateOnChange: false,
    validateOnModelUpdate: false,
    validateOnInput: false
});

const [password, passwordAttr] = defineField("password", {
    validateOnBlur: false,
    validateOnChange: false,
    validateOnModelUpdate: false,
    validateOnInput: false
})

const user = useUser();

const pendingRegister = ref(false);
const errorRegister = ref(false);

const handleRegister = async () => {
    if (pendingRegister.value || !name.value || !email.value || !password.value) return;
    pendingRegister.value = true;

    const validating = await validate();

    if (!validating.valid) {
        pendingRegister.value = false;
        return;
    };

    errorRegister.value = null;

    const {data, pending, error} = await register(values);

    pendingRegister.value = pending.value

    if (error.value) {
        if (error.value.statusCode === 400) {
            setErrors(error.value.data.data);
            return;
        }
        errorRegister.value = error.value.data.message
        return;
    }

    return await navigateTo("/login")
}

useHead({
    title: "Register to Flux"
})

definePageMeta({
    layout: false
})
</script>