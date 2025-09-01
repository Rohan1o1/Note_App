const nodemailer = require("nodemailer");

// Debug log for environment variables
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' : 'MISSING');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send OTP email to user
 * @param {string} to - recipient email
 * @param {string} otp - one time password
 * @returns {Promise<void>}
 */
async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${to}:`, info.response);
  } catch (err) {
    console.error(`Failed to send OTP email to ${to}:`, err);
    throw err;
  }
}

module.exports = { sendOtpEmail };
