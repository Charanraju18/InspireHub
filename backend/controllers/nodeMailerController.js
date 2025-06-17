const express = require("express");
const nodemailer = require("nodemailer");
const Mail = require("nodemailer/lib/mailer");
//sending mails
const MailSender = (req, res) => {
  const Tranporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kanurisravanthi191919@gmail.com",
      pass: "etho xuud ztcs brtr",
    },
  });
  const MailOptions = {
    from: "kanurisravanthi191919@gmail.com",
    to: req.body.email,
    subject: "Welcome to the EduAll Community!",
    text: `Hi ${req.body.name},\n\nThank you for joining the EduAll community!\nWe're excited to have you on board.\n\n- EduAll Team`,
  };

  Tranporter.sendMail(MailOptions, (err, info) => {
    if (err) {
      return res.status(400).json(err);
    }
    console.log("Mail sent:", info.response);
    return res.status(200).json("Mail Sent Successfully");
  });
};
exports.MailSender = MailSender;
