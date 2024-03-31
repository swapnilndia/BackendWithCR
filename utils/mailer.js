const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const { User } = require('../models/user.models')

sendEmail = async ({ email, emailType, userId }) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.GMAIL_USERID,
                pass: process.env.GOOGLE_ACCOUNT_PASSWORD
            }
        });



        const redirectURL = `http://localhost:5001/user/${emailType === "VERIFY" ? 'verify' : 'resetpass'}?token=${hashedToken}`

        const mailOptions = {
            from: {
                name: 'SocialApp',
                address: process.env.GMAIL_USERID
            },
            to: email,
            subject: "Email Verification",
            html: `<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #007bff; color: #fff; padding: 20px; text-align: center;">
                <h1>Email Verification</h1>
            </div>
            <img src="https://res.cloudinary.com/vistaprint/image/upload/c_scale,w_1349,h_808,dpr_2/f_auto,q_auto/v1705580305/ideas-and-advice-prod/en-us/featured_14223857a51.png?_i=AA" alt="Girl in a jacket" width="500" height="600">
            <div style="background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <p>Dear ${email},</p>
                <strong>Thank you for signing up with SocialApp😊!</strong>
                <p>To complete the registration process, please verify your email address by clicking on the link below:</p>
                <a href=${redirectURL} style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email Address</a>
                <p>If you did not request this registration, please disregard this email.</p>
                <p>Thank you,<br>SocialApp Team</p>
            </div>
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                <p>&copy; 2024 SocialApp😊. All rights reserved.</p>
            </div>
        </div>
        </body>`
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { sendEmail }
