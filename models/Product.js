const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: Array, required: true },
    category: { type: String, required: true },
    size: { type: String },
    price: { type: Number, required: true },
    availableQty: { type: Number, required: true },

}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("Product", ProductSchema);