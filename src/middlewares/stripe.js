require('dotenv').config();
const { Router } = require('express')
const Stripe = require("stripe");
const { CLAVE_STRIPE } = process.env;
const stripe = new Stripe(CLAVE_STRIPE)

const router = Router()

router.post("/", async (req, res) => {

    const { id, amount} = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description:"booking",
            payment_method: id,
            confirm: true, //confirm the payment at the same time
        });
        console.log(payment);       
        return res.json({ message: "Successful Payment" });

    } catch (error) {
        return res.json({ message: error.raw.message });
    }
});

module.exports = router;