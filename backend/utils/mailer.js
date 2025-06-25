const nodemailer = require("nodemailer");

// Configure your transporter with your Gmail credentials or SMTP server
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail or SMTP email
    pass: process.env.EMAIL_PASS, // your email password or app password
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
      <h2>${
        type === "reminder"
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
    <p>As a ${role.toLowerCase()}, you can ${
    role === "Instructor"
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

module.exports = { sendRegistrationMail, sendWelcomeEmail };
