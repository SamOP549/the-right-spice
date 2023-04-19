import Product from '../../models/Product'
import Combo from '../../models/Combo'
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    let products = await Product.find()
    let combos = await Combo.find()
    Array.prototype.push.apply(products,combos); 
    var results = req.query.q &&
        products.filter(product => product.title.toLowerCase().includes(req.query.q.toLowerCase()))
    res.statusCode = 200
    console.log(results)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ results }))
}

export default connectDb(handler);