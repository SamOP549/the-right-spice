const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    img: { type: Array, required: true },

}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("Promotion", PromotionSchema);