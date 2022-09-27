// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose"
import User from "../../models/User"

var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const { fname, mname, lname, gender, number, email } = req.body
        let u = new User({ fname, mname, lname, gender, number, email, password: CryptoJS.AES.encrypt(req.body.password, 'therightspice').toString() })
        await u.save()

        res.status(200).json({ success: "Success!" })
    }
    else {
        res.status(400).json({ error: "This mohod is not allowed" })
    }

}

export default connectDb(handler);
