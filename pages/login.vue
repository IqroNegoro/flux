<template>
    <div class="w-full h-screen flex justify-center items-center bg-secondary">
        <div class="w-full md:w-3/4 h-full md:h-[80%] shadow-md rounded-sm bg-white grid grid-cols-1 md:grid-cols-2 grid-rows-1 p-4">
            <div class="max-md:hidden flex justify-center items-center">
                <i class="bx bxs-shopping-bag-alt text-7xl text-primary"></i>
            </div>
            <form class="flex flex-col gap-12 justify-center items-center" @submit.prevent="handleLogin">
                <h1 class="tracking-wider text-2xl text-primary text-center">Login</h1>
                <div class="flex flex-col gap-2 w-full">
                    <p class="">Email</p>
                    <div class="flex flex-row justify-center border-b items-center w-full p-1" :class="{'border-red-500': errors.email}">
                        <i class="bx bx-envelope text-2xl pr-1"></i>
                        <input type="text" class="w-full bg-transparent" placeholder="Enter Your Email" v-model="email" v-bind="emailAttr">
                    </div>
                    <p class="text-xs" v-if="errors.email"> {{ errors.email }} </p>
                    <p class="">Password</p>
                    <div class="flex flex-row justify-center border-b items-center w-full p-1" :class="{'border-red-500': errors.password}">
                        <i class="bx bx-lock text-2xl pr-1"></i>
                        <input type="password" class="w-full bg-transparent" placeholder="Enter Your Password" v-model="password">
                    </div>
                    <p class="text-xs" v-if="errors.password"> {{ errors.password }} </p>
                    <p class="text-xs" v-if="errorLogin"> {{errorLogin}} </p>
                </div>
                <button class="disabled:cursor-not-allowed flex justify-center items-center w-full hover:bg-primary bg-secondary duration-150 rounded-sm text-white p-2" type="submit" @submit.prevent="handleLogin" :disabled="pendingLogin || !email || !password">
                    <i v-if="pendingLogin" class='bx bx-loader-alt bx-spin' ></i>
                    <p v-else>
                        Login
                    </p>
                </button>
                <p class="max-md:text-center" >Doesn't have account? <NuxtLink :to="{name: 'register'}" class="text-primary">Register</NuxtLink></p>
            </form>
        </div>
    </div>
</template>
<script setup>
import { toTypedSchema } from "@vee-validate/yup";
import { object, string } from "yup"

const { values, defineField, errors, setErrors, validate } = useForm({
    validationSchema: toTypedSchema(object({
        email: string().required("Please fill a correct email").email("Please fill a correct email"),
        password: string().required("Password required")
    })),
    // initialValues: {
    //     email: "iqronegoro0@gmail.com",
    //     password: "iqro"
    // },
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
});

const user = useUser();

const pendingLogin = ref(false);
const errorLogin = ref(null);

const handleLogin = async () => {
    if (pendingLogin.value || !email.value || !password.value) return;
    pendingLogin.value = true;

    const validating = await validate();

    if (!validating.valid) {
        pendingLogin.value = false;
        return;
    };

    errorLogin.value = null;

    const {data, pending, error} = await login({
        email: values.email,
        password: values.password
    });

    pendingLogin.value = pending.value

    if (error.value) {
        if (error.value.statusCode === 400) {
            setErrors(error.value.data.data)
        }
        errorLogin.value = error.value.data.message
        return;
    }

    user.$patch({...data.value});

    return await navigateTo("/shop")
}

useHead({
    title: "Login to Flux"
})

definePageMeta({
    layout: false
})
</script>