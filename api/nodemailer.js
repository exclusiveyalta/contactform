"use strict";
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");

const transporter = nodemailer.createTransport({
  service: "Yandex",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function mail({ name, phone, email, message }, files) {
  const emailOptions = {
    from: '"S_crappy PWNS 👻" <scrapwns@yandex.ru>', // sender address
    to: "scrapwns@gmail.com", // list of receivers
    subject: "ROFL ✔", // Subject line
    text: `MATE WTF? Name = ${name}, phone = ${phone}, email = ${email}, message = ${message}`, // plain text
    html: `MATE WTF? Name = ${name}, phone = ${phone}, email = ${email}, message = ${message}`, // html body
    attachments: files,
  };

  // 3. This will send the email with the `emailOptions` above.
  return transporter.sendMail(emailOptions);
}

async function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fields, files } = await parseForm(req);
    const emailRes = await mail(fields, files);

    if (emailRes.messageId) {
      return res.status(200).json({ message: `Email sent successfuly` });
    }

    return res.status(400).json({ message: "Error sending email" });
  }

  return res
    .status(400)
    .json({ message: `Incorrect method: ${req.method}. Did you mean POST?` });
}
