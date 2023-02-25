const mongoose = require('mongoose');

const CombSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: Array, required: true },
    price: { type: Number, required: true },
    contents: { type: Object, required: true },
    comments: { type: Object, required: false }

}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("Combo", CombSchema);