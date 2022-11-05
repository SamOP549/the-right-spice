// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken'

var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let dbuser = await User.findOneAndUpdate({ email: user.email }, { fname: req.body.fname, lname: req.body.lname, birthday: req.body.birthday, gender: req.body.gender, number: req.body.phone, altNumber: req.body.altPhone })

        const { fname, lname, birthday, gender, number, email, password, altNumber, addresses } = dbuser
        res.status(200).json({ fname, lname, birthday, gender, number, email, password, altNumber, addresses })

    }
    else {
        res.status(400).json({ "error": "error" })
    }
}

export default connectDb(handler);
