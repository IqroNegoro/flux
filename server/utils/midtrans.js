import midtrans from "midtrans-client";

export default () => {
    const config = useRuntimeConfig();
    return new midtrans.CoreApi({
        isProduction: false,
        serverKey: config.serverKey,
        clientKey: config.clientKey
    })
}