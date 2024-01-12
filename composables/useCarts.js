export const getCarts = async options => await useApi("carts", {
    ...options,
    default: () => [],
    lazy: true,
    key: `get-carts`
});

export const addToCart = async productId => await useApi(`carts`, {
    method: "POST",
    immediate: false,
    body: {productId},
    key: "add-to-cart"
});

export const incQty = async id => await useApi(`carts/${id}/inc`, {
    method: "PUT",
    immediate: false,
    key: `inc-${id}-product`
});

export const decQty = async id => await useApi(`carts/${id}/dec`, {
    method: "PUT",
    immediate: false,
    key: `dec-${id}-product`
});

export const deleteCart = async id => await useApi(`carts/${id}`, {
    method: "DELETE",
    immediate: false,
    key: `delete-${id}-cart`
});

export const getProductsCart = async id => await useApi(`checkout/${id}`, {
    lazy: true,
    default: () => [],
    key: 'get-products-cart'
});