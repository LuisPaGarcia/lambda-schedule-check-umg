const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(numeroGuia, nuevoStatus) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    // port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '" 👻" <test@test.com>', // sender address
    to: process.env.DESTINY_EMAILS, // list of receivers
    subject: "Actualizacion de las matrìculas", // Subject line
    text: "", // plain text body
    html: `<b>La guia ${numeroGuia} del envio de la matrìcula ha cambiado a: ${nuevoStatus}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendEmail("testing-numGuia", "estado-nuevo-test").catch(console.error);
