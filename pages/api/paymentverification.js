import crypto from 'crypto';
import Order from '../../models/Order';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    if (req.method === "POST") {
        console.log(req.body)
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {

            let order = await Order.findOneAndUpdate({ orderId: razorpay_order_id }, { status: "Paid", paymentInfo: req.body })

            res.redirect('/order')

        }
        else {
            let order = await Order.findOneAndUpdate({ orderId: razorpay_order_id }, { status: "Pending", paymentInfo: req.body })
            res.status(400).json({ error: "error" })
        }

        res.status(200).json({ success: "true" })
    }
    else {
        res.status(400).json({ error: "error" })
    }
}

export default connectDb(handler);