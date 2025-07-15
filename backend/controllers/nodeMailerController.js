const nodemailer = require("nodemailer");

// sending mails
const MailSender = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.body.email,
    subject: "Welcome to the EduAll Community!",
    text: `Hi ${req.body.name},\n\nThank you for joining the EduAll community!\nWe're excited to have you on board.\n\n- EduAll Team`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(400).json(err);
    }
    console.log("Mail sent:", info.response);
    return res.status(200).json("Mail Sent Successfully");
  });
};

exports.MailSender = MailSender;
