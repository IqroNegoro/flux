export default defineEventHandler(async e => {
    const {shipping_province} = getQuery(e);
    const config = useRuntimeConfig();

    const city = await $fetch("https://api.rajaongkir.com/starter/city", {
        headers: {
            key: config.rajaOngkirKey
        },
        query: {
            province: JSON.parse(shipping_province).province_id
        }
    });

    return city.rajaongkir.results;
});