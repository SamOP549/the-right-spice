// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Promotion from "../../models/Promotion"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    console.log(req.body)
    if (req.method == 'POST') {
        for (let i = 0; i < req.body.ids.length; i++){
            let p = await Promotion.findOneAndDelete({ _id: req.body.ids[i] })
        }
        res.status(200).json({ success: "Success!" })
    }
    else {
        res.status(400).json({ error: "This mohod is not allowed" })
    }
    let Promotions = await Promotion.find()
    res.status(200).json({ Promotions })
}

export default connectDb(handler);
