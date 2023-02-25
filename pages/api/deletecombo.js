// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Combo from "../../models/Combo"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    console.log(req.body)
    if (req.method == 'POST') {
        for (let i = 0; i < req.body.ids.length; i++){
            let p = await Combo.findOneAndDelete({ _id: req.body.ids[i] })
        }
        res.status(200).json({ success: "Success!" })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
    let combos = await Combo.find()
    res.status(200).json({ combos })
}

export default connectDb(handler);
