// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Combo from "../../models/Combo"
import connectDb from "../../middleware/mongoose"
const handler = async (req, res) => {
    if (req.method == 'POST') {
        if(req.body.action == "remove"){
            let p = await Combo.findOneAndUpdate({ _id: req.body.comboid },
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
            let p = await Combo.findOneAndUpdate({ _id: req.body.comboid , "comments._id": req.body.commentid },
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

