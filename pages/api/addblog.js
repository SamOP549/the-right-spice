// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Article from "../../models/Article"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let p = new Article({
            title: req.body.form.title,
            slug: req.body.form.slug,
            excerpt: req.body.excerpt,
            stage: req.body.stage,
            text: req.body.text,
            coverImg: req.body.images,
            comments: [],
        })
        await p.save()
        res.status(200).json({ success: "Success!" })
    }
    else {
        res.status(400).json({ error: "This mohod is not allowed" })
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