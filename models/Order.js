const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schem({
    userId: {type: String, required: true},
    products: [
        {
            producId: {type: String},
            quantity: {type: Number, default: 1}
        }
    ],
    address: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, default: 'Pending', required: true},
}, {timestamps: true})

 export default mongoose.model("Order", OrderSchema);