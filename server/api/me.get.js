export default defineEventHandler(e => {
    setResponseStatus(e, 200);
    return e.context.auth;
})