const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    rayzorpay_order_id: {
        type: String,
        required: true
    },
    rayzorpay_payment_id: {
        type: String,
        required: true
    },
    rayzorpay_signature: {
        type: String,
        required: true
    },
}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("Payment", PaymentSchema);