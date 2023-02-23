// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Article from "../../models/Article"
import connectDb from "../../middleware/mongoose"

const shortid = require("shortid");
const handler = async (req, res) => {
    if (req.method == 'POST') {
        req.body.rvw._id = shortid.generate();
        let p = await Article.findOneAndUpdate({ _id: req.body.id },
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
    let articles = await Article.find()
    res.status(200).json({ articles })
}

export default connectDb(handler);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}

