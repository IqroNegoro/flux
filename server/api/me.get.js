export default defineEventHandler(e => {
    if (!e.context.auth) throw createError({
        statusCode: 403,
        message: "Unauthenticated"        
    });
    
    setResponseStatus(e, 200);
    return e.context.auth;
})