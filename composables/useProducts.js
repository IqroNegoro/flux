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