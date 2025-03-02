import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_EMAIL,  // Use environment variables
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Send an email
 * @param to Recipient's email
 * @param subject Email subject
 * @param text Email body text
 */
export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};
