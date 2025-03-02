"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        to,
        subject,
        text,
    };
    return transporter.sendMail(mailOptions);
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map