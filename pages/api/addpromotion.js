// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Promotion from "../../models/Promotion"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let p = new Promotion({
            title: req.body.title,
            img: req.body.images,
        })
        await p.save()
        res.status(200).json({ success: "Success!" })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
    let promotions = await Promotion.find()
    res.status(200).json({ promotions })
}

export default connectDb(handler);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}
