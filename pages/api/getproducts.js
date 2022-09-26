// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    let products = await Product.find()
    let spices = {}
    for(let item of products){
        if(item.title in spices){
            if(!spices[item.title].size.includes(item.size) && item.availableQty > 0){
                spices[item.title].size.push(item.size)
            }
        }
        else{
            spices[item.title] = JSON.parse(JSON.stringify(item))
            if(item.availableQty > 0){
                spices[item.title].size = [item.size]
            }
        }
    }
    res.status(200).json({ spices })
}

export default connectDb(handler);
