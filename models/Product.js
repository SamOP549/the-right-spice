const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, default: "product" },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: Array, required: true },
    discount: { type: Number, required: false, default: 0 },
    size: { type: String },
    price: { type: Number, required: true },
    availableQty: { type: Number, required: true },
    comments: { type: Object, required: false }

}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("Product", ProductSchema);