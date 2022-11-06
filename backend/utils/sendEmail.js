const nodEmailer = require("nodemailer");

const sendEmail = async (options) => {
   const transporter = nodEmailer.createTransport({
      host:process.env.HOST,
      port:process.env.SMTP_PORT,
      auth: {
         user: process.env.MAIL,
         pass: process.env.PASSWORD, 
      },
   });

   const mailOptions = {
      from: process.env.MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
   };
  await  transporter.sendMail(mailOptions)
};
module.exports = sendEmail;