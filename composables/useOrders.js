export const getOrders = async () => await useApi(`orders`, {
    lazy: true,
    default: () => [],
    key: "get-orders"
});

export const createOrder = async body => await useApi(`orders`, {
    method: "POST",
    lazy: true,
    default: () => {},
    body,
    key: "create-order"
});

export const getOrder = async id => await useApi(`orders/${id}`, {
    lazy: true,
    default: () => {},
    key: `get-${id}-order`
});

export const getOrderStatus = async orderId => await useApi(`orders/status/${orderId}`, {
    lazy: true,
    immediate: false,
    default: () => {},
    key: `get-${orderId}-status`
})