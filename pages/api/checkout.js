import connectDb from "../../middleware/mongoose"
import Order from "../../models/Order"
import Product from "../../models/Product"
import pincodes from '../../pincodes.json'

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

            //CHeck if the pincode is serviceable

            if (!Object.keys(pincodes).includes(req.body.pinCode)) {
                res.status(400).json({ "error": "The pincode you entered is not serviceable!", "cartClear": false })
                return
            }

            //Check if the cart is tampered with
            let product, sumTotal = 0;
            let cart = req.body.cart;
            if (req.body.subTotal <= 0) {
                res.status(400).json({ "error": "Cart empty! Please build your cart and try again!", "cartClear": false })
                return
            }
            for (let item in cart) {
                sumTotal += cart[item].price * cart[item].qty
                product = await Product.findOne({ slug: item })

                //Check if the cart is out of stock
                if (product.availableQty < cart[item].qty) {
                    res.status(400).json({ "error": "Some items in your cart went out of stock!", "cartClear": true });
                }

                if (product.price != cart[item].price) {
                    res.status(400).json({ "error": "Some items in your cart have changed. Please try again!", "cartClear": true });
                    return
                }
            }
            if (sumTotal !== req.body.subTotal) {
                res.status(400).json({ "error": true, "cartClear": true });
                return
            }

            //Check if the details are valid

            if (req.body.phone.length !== 10 || !Number.isInteger(Number(req.body.phone))) {
                res.status(400).json({ "error": "Please enter your 10 digit Phone Number", "cartClear": false });
                return
            }
            if (req.body.pinCode.length !== 6 || !Number.isInteger(Number(req.body.pinCode))) {
                res.status(400).json({ "error": "Please enter your 6 digit Pincode", "cartClear": false });
                return
            }

            //Create a new order
            const response = await razorpay.orders.create(options);
            let order = new Order({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                orderId: response.id,
                number: req.body.phone,
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