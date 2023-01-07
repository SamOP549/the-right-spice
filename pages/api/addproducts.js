// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let p = new Product({
            title: req.body.form.title,
            slug: req.body.form.slug,
            desc: req.body.form.desc,
            img: req.body.images,
            category: req.body.form.category,
            size: req.body.form.size,
            price: req.body.form.price,
            availableQty: req.body.form.availableQty,
            comments: [],
        })
        await p.save()
        res.status(200).json({ success: "Success!" })
    }
    else {
        res.status(400).json({ error: "This mohod is not allowed" })
    }
    let products = await Product.find()
    res.status(200).json({ products })
}

export default connectDb(handler);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}
