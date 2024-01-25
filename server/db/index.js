import { PrismaClient } from "@prisma/client";
let prisma;

if (!prisma) {
    prisma = new PrismaClient().$extends({
        result: {
            // products: {
            //     description: {
            //         needs: {description: true},
            //         compute(product) {
            //             return unescape(product.description)
            //         }
            //     }
            // },
            // carts: {
            //     product: {
            //         needs: {product: {description: true}},
            //         compute(cart) {
            //             return {...cart.product, description: unescape(cart.product.description)}
            //         }
            //     }
            // }
        }
    })
}

export default prisma;