const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    text: { type: String, required: true },
    stage: { type: String, required: true },
    coverImg: { type: Array, required: true },
    comments: { type: Array, required: false }
}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("Article", ArticleSchema);