import prisma from "~/server/db";
import {v4} from "uuid";

export default defineEventHandler(async e => {
    let parameter = {
        "payment_type": "bank_transfer",
        "transaction_details": {
            "gross_amount": 24145,
            "order_id": "test-transaction-321",
        },
        "bank_transfer":{
            "bank": "bca"
        }
    };
    midtrans().charge(parameter).then(res => {
        console.log(res)
    }).catch(res => {
        console.log(res)
    })
})