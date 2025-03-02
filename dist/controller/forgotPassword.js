"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const user_1 = __importDefault(require("../models/user"));
const email_1 = require("../utils/email");
const bcrypt_1 = __importDefault(require("bcrypt"));
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await user_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const token = crypto_1.default.randomBytes(32).toString('hex');
        console.log(token);
        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 3600000);
        await user.save();
        const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;
        await (0, email_1.sendEmail)(user.email, 'Password Reset Request', `Click this link to reset: ${resetUrl}`);
        return res.status(200).json({ message: 'Reset email sent' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    const { token, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
        const user = await user_1.default.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }
        });
        if (!user)
            return res.status(400).json({ message: 'Invalid or expired token' });
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        return res.status(200).json({ message: 'Password successfully reset' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=forgotPassword.js.map