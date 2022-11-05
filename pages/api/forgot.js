import Forgot from "../../models/Forgot"
import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken'

var CryptoJS = require("crypto-js");

const handler = async (req, res) => {

    if (req.body.sendMail) {
        let token = `scscsccdscdscaw2edd`
        let forgot = new Forgot({
            email: req.body.email,
            token: token
        })
        let email = `
        Hello [name],
        
        There was a request to change your password!
        
        If you did not make this request then please ignore this email.
        
        Otherwise, please click this link to change your password: <a href='https://therightspice.com/forgot?token=${token}'>Reset Password</a>
        
        Yours,
        The Right Spice team`
    }
    else {
        let dbuser = await User.findOne({ email: req.body.email }, { password: CryptoJS.AES.encrypt(req.body.newpass, process.env.AES_SECRET).toString() })
    }
    
    res.status(200).json({ "success": "success" })

}

export default connectDb(handler);