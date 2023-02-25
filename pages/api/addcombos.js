// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Combo from '../../models/Combo'
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let p = new Combo({
            title: req.body.form.title,
            slug: req.body.form.slug,
            desc: req.body.form.desc,
            img: req.body.images,
            price: req.body.form.price,
            contents: req.body.selected,
            comments: [],
        })
        await p.save()
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
