// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken'

var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let dbuser = await User.findOne({ email: user.email })
        if (req.body.oldpass != CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8)) {
            res.status(400).json({ "error": 'Incorrect Password!' })
        }
        dbuser = await User.findOneAndUpdate({ email: user.email }, { password: CryptoJS.AES.encrypt(req.body.newpass, process.env.AES_SECRET).toString() })

        res.status(200).json({ "success": "Password Updated!" })

    }
    else {
        res.status(400).json({ "error": "error" })
    }
}

export default connectDb(handler);
