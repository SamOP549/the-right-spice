import crypto from 'crypto';
import Order from '../../models/Order';
import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    if (req.method === "POST") {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {

            let order = await Order.findOneAndUpdate({ orderId: razorpay_order_id }, { status: "Paid", paymentInfo: req.body })
            let products = order.products
            for (let slug in products) {
                await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - products[slug].qty } })

            }

            res.redirect(`/order?id=${order._id}&clearCart=1`)

        }
        else {
            let order = await Order.findOneAndUpdate({ orderId: razorpay_order_id }, { status: "Failed", paymentInfo: req.body })
            res.status(500).json({ error: "Some error occured!" })
        }

        res.status(200).json({ success: "true" })
    }
    else {
        res.status(400).json({ error: "error" })
    }
}

export default connectDb(handler);