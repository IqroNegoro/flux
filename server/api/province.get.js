export default defineEventHandler(async e => {
    const config = useRuntimeConfig();

    const province = await $fetch("https://api.rajaongkir.com/starter/province", {
        headers: {
            key: config.rajaOngkirKey
        },
    });

    return province.rajaongkir.results;
});