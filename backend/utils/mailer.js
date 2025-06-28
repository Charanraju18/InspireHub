const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendRegistrationMail = async (
  to,
  eventTitle,
  type = "confirmation",
  reminderLabel = ""
) => {
  const subject =
    type === "reminder"
      ? `Reminder: "${eventTitle}" starts in ${reminderLabel}`
      : `You're registered for "${eventTitle}"`;

  const message =
    type === "reminder"
      ? `<p>This is a reminder that your event <strong>${eventTitle}</strong> will begin in <strong>${reminderLabel}</strong>. Please be ready to join!</p>`
      : `<p>You have successfully registered for the live event <strong>${eventTitle}</strong>.</p>`;

  await transporter.sendMail({
    from: `"InspireHub" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: `
      <h2>${type === "reminder"
        ? "Upcoming Event Reminder"
        : "Registration Successful"
      }</h2>
      ${message}
      <p>— InspireHub Team</p>
    `,
  });
};

const sendWelcomeEmail = async (to, name, role) => {
  const subject =
    role === "Instructor"
      ? "Welcome to InspireHub, Instructor!"
      : "Welcome to InspireHub, Learner!";

  const message = `
    <p>Hi <strong>${name}</strong>,</p>
    <p>🎉 Welcome to <strong>InspireHub</strong>! We're thrilled to have you join as a <strong>${role}</strong>.</p>
    <p>As a ${role.toLowerCase()}, you can ${role === "Instructor"
      ? "start sharing your knowledge through roadmaps and guide learners."
      : "explore roadmaps, attend live events, and grow your skills."
    }</p>
    <p>If you have any questions, feel free to contact us anytime.</p>
    <p>— The InspireHub Team</p>
  `;

  await transporter.sendMail({
    from: `"InspireHub" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: message,
  });
};

const getInTouchToIns = async (toName, toMail, userName, userMsg, userMail, category) => {

  const message = `
    <p>Hi ${toName},</p>
    <p>You have received a new ${category} from <strong>${userName}</strong>.</p>
    <p><strong>Email:</strong> ${userMail}</p>
    <p><strong>Message:</strong> ${userMsg}</p>
    <p>— InspireHub Team</p>
  `;

  await transporter.sendMail({
    from: `"InspireHub" <${process.env.EMAIL_USER}>`,
    to: toMail,
    subject: `New message from ${userName}`,
    html: message,
  });
}

function generateOtp(length = 6) {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  ).toString();
}
const emailVerifyWithOtp = async (to) => {
  const otp = generateOtp();
  const subject = "Verify Your Email with OTP";
  const message = `
    <p>Hi there,</p>
    <p>Your OTP for email verification is: <strong>${otp}</strong></p>
    <p>Please use this OTP to complete your registration.</p>
    <p>— InspireHub Team</p>
  `;

  await transporter.sendMail({
    from: `"InspireHub" <${process.env.EMAIL_USER}>`,
    to: to,
    subject,
    html: message,
  });
  return otp;
};

module.exports = {
  sendRegistrationMail,
  sendWelcomeEmail,
  getInTouchToIns,
  emailVerifyWithOtp,
};
