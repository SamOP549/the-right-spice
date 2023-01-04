// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Article from "../../models/Article"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    console.log(req.body)
    if (req.method == 'POST') {
        for (let i = 0; i < req.body.ids.length; i++){
            let p = await Article.findOneAndDelete({ _id: req.body.ids[i] })
        }
        res.status(200).json({ success: "Success!" })
    }
    else {
        res.status(400).json({ error: "This mohod is not allowed" })
    }
    let Articles = await Article.find()
    res.status(200).json({ Articles })
}

export default connectDb(handler);
