// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Combo from "../../models/Combo"
import connectDb from "../../middleware/mongoose"

const shortid = require("shortid");
const handler = async (req, res) => {
    if (req.method == 'POST') {
        req.body.rvw._id = shortid.generate();
        let p = await Combo.findOneAndUpdate({ _id: req.body.id },
            {
                $push: {
                    comments: req.body.rvw
                }
            })
        console.log(p)
        res.status(200).json({ success: "Success!" })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
    let combos = await Combo.find()
    res.status(200).json({ combos })
}

export default connectDb(handler);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}

