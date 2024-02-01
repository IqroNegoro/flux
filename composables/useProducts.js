export const getProducts = async () => await useApi("products", {
    default: () => [],
    lazy: true,
    key: "get-products"
});

export const getProduct = async id => await useApi(`products/${id}`, {
    default: () => {},
    lazy: true,
    key: `get-${id}-product`
});

export const getFilteredProducts = async params => await useApi(`products`, {
    params,
    default: () => {},
    lazy: true,
    immediate: false,
    key: 'get-filtered-products'
})