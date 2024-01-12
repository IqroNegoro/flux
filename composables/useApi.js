let baseURL = "/api/";
if (process.client && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)) baseURL = "http://192.168.159.87:3000/api/"
if (process.env.NODE_ENV === "production") baseURL = "https://flux.netlify.app/";

export const useApi = async (url, options) => await useFetch(url, {
    ...options,
    headers: useRequestHeaders(["cookie"]),
    baseURL
});