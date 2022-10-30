import { response } from "express";
import connectDb from "../../middleware/mongoose"
import Order from "../../models/Order"

const Razorpay = require("razorpay");
const shortid = require("shortid");

const handler = async (req, res) => {
    if (req.method === "POST") {
        // Initialize razorpay object
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        // Create an order -> generate the OrderID -> Send it to the Front-end
        const payment_capture = 1;
        const amount = req.body.subTotal;
        const currency = "INR";
        const options = {
            amount: (amount * 100).toString(),
            currency,
            receipt: shortid.generate(),
            payment_capture,
        };

        try {
            const response = await razorpay.orders.create(options);

            //Create a new order

            let order = new Order({
                email: req.body.email,
                orderId: response.id,
                address: req.body.address,
                locality: req.body.locality,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pinCode,
                amount: req.body.subTotal,
                products: req.body.cart,
            })

            await order.save()

            res.status(200).json({
                id: response.id,
                currency: response.currency,
                amount: response.amount,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    } else {
        // Handle any other HTTP method
    }
}

export default connectDb(handler);