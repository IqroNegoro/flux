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