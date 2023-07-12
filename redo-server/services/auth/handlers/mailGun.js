// import FormData from "form-data";
// import { Mailgun } from "mailgun.js";

// const formData = new FormData();
// const mailgun = new Mailgun(formData);

// const mg = mailgun.client({
//   fullName: "api",
//   key: "2efcbf5890084f958e15ae9420cd8541-70c38fed-0dec5f26",
// });

// export async function sendMailGun(options) {
//   const mailOptions = {
//     from: "Semos <postmaster@semosacademy.mailgun.org>",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   console.log(mailOptions);

//   await mg.messages.create(
//     "sandbox43c588f5abfa4eb7a9cbc957f503cbb3.mailgun.org",
//     mailOptions
//   );
// }

// export { sendMailGun }; // Add this line to explicitly export the sendMailGun function
