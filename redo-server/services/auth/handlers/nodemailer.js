// server/utils/resetPassword.js

const nodemailer = require('nodemailer');

// Send Reset Password Email
const sendResetPasswordEmail = (email, resetToken) => {
  const transporter = nodemailer.createTransport({
  host: "mail.ekhein-llc.com ",
  port: 465,
  secure: true,

    auth: {
      user: 'app-test@ekhein-llc.com',
      pass: 'FNeuJv!56%[D',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Please click the following link to reset your password:</p>
           <a href="http://your-app.com/reset-password/${resetToken}">Reset Password</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Reset password email sent:', info.response);
    }
  });
};

module.exports = {
  sendResetPasswordEmail,
};
// const nodemailer = require("nodemailer");

// const sendEmail = async (options) => {
//   // 1) Kreiranje na transporter
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "karolinapan828@gmail.com",
//       pass: "javaScript1@"
//     }
//   })

// //   const transport = nodemailer.createTransport({
// //     host: process.env.EMAIL_HOST,
// //     port: process.env.EMAIL_PORT,
// //     auth: {
// //       user: process.env.EMAIL_ADRESS,
// //       pass: process.env.EMAIL_PASSWORD,
// //     },
// //   });

//   // 2) Verifikacija na transporot ili logiranje

//   transporter.verify((err, succ) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("uspesno praten email");
//     }
//   });

//   // 3) da gi definirame opccite na emailot
//   const mailOptions = {
//     from: "karolina <karolinapan828@gmail.com>",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   // 4) Da go ispratime mailot
//   // ova kje ni vrati promis
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;