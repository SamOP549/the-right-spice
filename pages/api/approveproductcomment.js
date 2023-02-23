// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"
const handler = async (req, res) => {
    if (req.method == 'POST') {
        if(req.body.action == "remove"){
            let p = await Product.findOneAndUpdate({ _id: req.body.productid },
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
            let p = await Product.findOneAndUpdate({ _id: req.body.productid , "comments._id": req.body.commentid },
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

