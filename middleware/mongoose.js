import mongoose from "mongoose";
require('dotenv').config({ path: '.env.local' });

const dotenv = require("dotenv");

dotenv.config();
const connectDb = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    await mongoose.connect(process.env.MONGO_URI)
    return handler(req, res)
}

export default connectDb;