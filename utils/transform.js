export const formatRp = num => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
}).format(num);

export const capitalize = string => string ? string[0].toUpperCase() + string.slice(1) : ""