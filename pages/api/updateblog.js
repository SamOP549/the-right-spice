// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Article from "../../models/Article"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    console.log(req.body)
    if (req.method == 'POST') {
        let p = await Article.findOneAndUpdate({ _id: req.body.id }, { title: req.body.form.title, text: req.body.text, slug: req.body.form.slug, excerpt: req.body.excerpt, coverImg: req.body.images, stage: req.body.stage })
        console.log(p)
        res.status(200).json({ success: "Success!" })
    }
    else {
        res.status(400).json({ error: "This mohod is not allowed" })
    }
    let Articles = await Article.find()
    res.status(200).json({ Articles })
}

export default connectDb(handler);
