const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: Object, default: '' },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    locality: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    amount: { type: Number, required: true },
    shippingcharges: { type: Number, required: true, default: 0 },
    status: { type: String, default: 'Initiated', required: true },
    deliveryStatus: { type: String, default: 'unshipped', required: true },
}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("Order", OrderSchema);