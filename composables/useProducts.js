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
});

export const getRatings = async id => await useApi(`products/${id}/ratings`, {
    lazy: true,
    immediate: false,
    default: () => {},
    key: `get-${id}-rating`
})

export const sendReviews = async (id, body) => await useApi(`products/${id}/ratings`, {
    method: "POST",
    body,
    default: () => {},
    lazy: true,
    key: `post-${body}-rating`
});