import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import {Stripe} from 'stripe';
const stripe = Stripe;("sk_test_51KAs1pSI9yQB0WavNTKLJYHokilqWgx0x77HJgT7Abdaayw531CufwPoMuOmasqdxjj8V2wPjTiDEoqxw7y22Esw00cpciZUP1")

const stripeRoutes = express.Router()
console.log("stripe double check")

stripeRoutes.post("orders/:id/pay", (req, res, next) => {
    console.log(req.body.token);
    const { token } = req.body;
    const idempotencyKey = uuidv4();
    console.log('stripe check')
    return stripe.customers.create({
        email: token.email,
        source: token
    }).then(customer => {
        stripe.charges.create({
            amount: req.body.totalPrice,
            currency: usd,
            customer: customer.id,
            receipt_email: token.email
        }, {idempotencyKey})
    }).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        console.log(err)
    })
})

export default stripeRoutes;