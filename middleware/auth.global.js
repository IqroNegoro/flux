export default defineNuxtRouteMiddleware(async (to, from) => {
    const {data, error} = await useApi("me");

    if (error.value) {
        console.log(error.value);
        if (to.name != "login" && from.name != "login") return await navigateTo("/login");
    }

    const user = useUser();

    user.$patch({
        ...data.value,
        authenticated: true
    });

    if (to.name == "login") return await navigateTo("/");
});