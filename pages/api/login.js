// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose"
import User from "../../models/User"

var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ $or: [{ email: req.body.emailOrNumber }, { number: req.body.emailOrNumber }] })
        if (user) {
            if ((req.body.emailOrNumber == user.email || req.body.emailOrNumber == user.number) && req.body.password == CryptoJS.AES.decrypt(user.password, 'therightspice').toString(CryptoJS.enc.Utf8)) {
                res.status(200).json({ success: true, email: user.email, fname: user.fname })
            }
            else {
                res.status(200).json({ success: false, error: "Invalid credentials!" })
            }
        }
        else {
            res.status(200).json({ success: false, error: "No user found!" })
        }

    }
    else {
        res.status(400).json({ error: "This mohod is not allowed" })
    }

}

export default connectDb(handler);
