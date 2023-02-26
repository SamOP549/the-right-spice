// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken'
const shortid = require('shortid');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let dbuser;
        if (req.body.addressFunction == 'add') {
            req.body.completeAddress.id = shortid.generate()
            dbuser = await User.findOneAndUpdate({ email: user.email }, { $push: { addresses: req.body.completeAddress } })
        }
        else if (req.body.addressFunction == 'update') {
            dbuser = await User.findOneAndUpdate({ email: user.email, "addresses.id": req.body.completeAddress.id },
                {
                    $set: {
                        "addresses.$.fname": req.body.completeAddress.fname,
                        "addresses.$.lname": req.body.completeAddress.lname,
                        "addresses.$.phone": req.body.completeAddress.phone,
                        "addresses.$.pincode": req.body.completeAddress.pincode,
                        "addresses.$.address": req.body.completeAddress.address,
                        "addresses.$.locality": req.body.completeAddress.locality,
                        "addresses.$.city": req.body.completeAddress.city,
                        "addresses.$.state": req.body.completeAddress.state,
                    }
                }
            )
        }
        else if (req.body.addressFunction == 'delete') {
            dbuser = await User.findOneAndUpdate({ email: user.email }, { $pull: { addresses: { id: req.body.address.id, } } })
        }
        res.status(200).json({ 'user': dbuser })

    }
    else {
        res.status(400).json({ "error": "error" })
    }
}

export default connectDb(handler);
