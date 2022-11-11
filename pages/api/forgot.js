import Forgot from "../../models/Forgot"
import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken'

var CryptoJS = require("crypto-js");
const shortid = require("shortid");
const SibApiV3Sdk = require('sib-api-v3-sdk');

const handler = async (req, res) => {

    if (req.body.sendMail) {
        let dbuser = await User.findOne({ email: req.body.email })
        let token = shortid.generate()
        let forgot = new Forgot({
            userid: dbuser._id,
            email: req.body.email,
            token: token
        })
        await forgot.save();
        let email = `
        Hello [name],
        
        There was a request to change your password!
        
        If you did not make this request then please ignore this email.
        
        Otherwise, please click this link to change your password: <a href='http://localhost:3000/forgot?token=${token}'>Reset Password</a>
        
        Yours,
        The Right Spice team`
        let defaultClient = SibApiV3Sdk.ApiClient.instance;

        let apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.subject = "Reset Your Password!";
        sendSmtpEmail.htmlContent = email;
        sendSmtpEmail.sender = { name: "The Right Spice", email: "jainsamarth549@gmail.com" };
        sendSmtpEmail.to = [{ email: req.body.email }];
        sendSmtpEmail.params = { name: "The Right Spice", email: "jainsamarth549@gmail.com" };

        apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
            res.status(200).json({ "success": "success", data: JSON.stringify(data) })
        }, function (error) {
            res.status(400).json({ error: error })
        });
    }
    else {
        let dbuser = await Forgot.findOne({ token: req.body.token })
        let dbuserpass = await User.findOneAndUpdate({ email: dbuser.email }, { password: CryptoJS.AES.encrypt(req.body.newpass, process.env.AES_SECRET).toString() })
        dbuser = await Forgot.findOneAndRemove({ token: req.body.token })

    }
    res.status(200).json({ "success": "success" })


}

export default connectDb(handler);