// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Article from "../../models/Article"
import connectDb from "../../middleware/mongoose"
const handler = async (req, res) => {
    if (req.method == 'POST') {
        if(req.body.action == "remove"){
            let p = await Article.findOneAndUpdate({ _id: req.body.blogid },
                {
                    $pull: {
                        comments: {
                            _id: req.body.commentid
                        }
                    }
                })
            console.log(p)
            res.status(200).json({ success: "Successfully removed the comment!" })
        }
        else if(req.body.action == "approve"){
            let p = await Article.findOneAndUpdate({ _id: req.body.blogid , "comments._id": req.body.commentid },
                {
                    $set: {
                        "comments.$.approved": true
                    }
                })
            console.log(p)
            res.status(200).json({ success: "Successfully approved the comment!" })
        }
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

