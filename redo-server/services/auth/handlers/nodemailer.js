import nodemailer from 'nodemailer';


// Send Reset Password Email
export const sendResetPasswordEmail = (email, resetToken) => {
  const transporter = nodemailer.createTransport({
  host: "mail.ekhein-llc.com", //ovde izmeni
  port: 465,
  secure: true, 
    auth: {
      user: 'app-test@ekhein-llc.com', //ovde izmeni
      pass: 'FNeuJv!56%[D', //ovde izmeni
    },
    tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
  });
  // verify connection configuration
 transporter.verify(function (error, success) {
   if (error) {
     console.log(error);
   } else {
     console.log("Server is ready to take our messages");
   }
 });
  const mailOptions = {
    from: 'app-test@ekhein-llc.com', //ovde izmeni
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Please click the following link to reset your password:</p>
           <a href="http://localhost:5173/reset-password/${resetToken}">Reset Password</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Reset password email sent:', info.response);
    }
  });
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
