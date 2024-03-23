const nodemailer = require('nodemailer')

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        //Todo: configure mail for usage
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });
        const mailOptions = {
            from: 'swapnilktr@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your Password", // Subject line
            html: "<b>Hello world?</b>", // html body
        }
        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse
    } catch (error) {
        console.log(error.message)
    }
}