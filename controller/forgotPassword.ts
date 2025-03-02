import { Request, Response } from 'express';
import crypto from 'crypto';
import User from '../models/user';
import { sendEmail } from '../utils/email'; 
import bcrypt from 'bcrypt';

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Generate reset token
      const token = crypto.randomBytes(32).toString('hex');
   console.log(token)
      // Set token and expiry in user record
      user.resetPasswordToken = token;
      user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1-hour expiry
      await user.save();
  
      // Send reset email
      const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;
      await sendEmail(user.email, 'Password Reset Request', `Click this link to reset: ${resetUrl}`);
  
     return res.status(200).json({ message: 'Reset email sent' });
    } catch (error) {
     return res.status(500).json({ message: 'Server error' });
    }
  };

// reset password
export const resetPassword= async (req:Request, res:Response) => {
    const { token, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
  
    try {
      const user = await User.findOne({ 
        resetPasswordToken: token, 
        resetPasswordExpires: { $gt: new Date() } 
      });
  
      if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update user password and remove token fields
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      return res.status(200).json({ message: 'Password successfully reset' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  }
  