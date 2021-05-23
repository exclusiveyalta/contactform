"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Yandex",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

console.log(process.env.MAIL_USER, process.env.MAIL_PASS);

async function mail() {
  const emailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "scrapwns@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  // 3. This will send the email with the `emailOptions` above.
  return transporter.sendMail(emailOptions);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const emailRes = await mail(req.body);
    if (emailRes.messageId) {
      return res.status(200).json({ message: `Email sent successfuly` });
    }

    return res.status(400).json({ message: "Error sending email" });
  }

  return res
    .status(400)
    .json({ message: `Incorrect method: ${req.method}. Did you mean POST?` });
}
