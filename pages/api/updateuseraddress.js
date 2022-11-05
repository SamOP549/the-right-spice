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
            req.body.completeAddress.CA_id = shortid.generate()
            dbuser = await User.findOneAndUpdate({ email: user.email }, { $push: { addresses: req.body.completeAddress } })
        }
        else if (req.body.addressFunction == 'update') {
            dbuser = await User.findOneAndUpdate({ email: user.email, "addresses.CA_id": req.body.completeAddress.CA_id },
                {
                    $set: {
                        "addresses.$.CA_fname": req.body.completeAddress.CA_fname,
                        "addresses.$.CA_lname": req.body.completeAddress.CA_lname,
                        "addresses.$.CA_phone": req.body.completeAddress.CA_phone,
                        "addresses.$.CA_pincode": req.body.completeAddress.CA_pincode,
                        "addresses.$.CA_address": req.body.completeAddress.CA_address,
                        "addresses.$.CA_locality": req.body.completeAddress.CA_locality,
                        "addresses.$.CA_city": req.body.completeAddress.CA_city,
                        "addresses.$.CA_state": req.body.completeAddress.CA_state,
                    }
                }
            )
        }
        else if (req.body.addressFunction == 'delete') {
            dbuser = await User.findOneAndUpdate({ email: user.email }, { $pull: { addresses: { CA_id: req.body.address.CA_id, } } })
        }
        res.status(200).json({ 'user': dbuser })

    }
    else {
        res.status(400).json({ "error": "error" })
    }
}

export default connectDb(handler);
