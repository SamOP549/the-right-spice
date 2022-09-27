const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    mname: { type: String, required: false },
    lname: { type: String, required: false },
    gender: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("User", UserSchema);