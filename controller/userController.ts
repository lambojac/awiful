import { Request, Response } from 'express';
import User from '../models/user'; 
import bcrypt from 'bcrypt';
import asynchandler from "express-async-handler";
import genToken from "../utils/genToken";
import { UserDocument } from '../models/user';


// create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password, gender, address, country, username, email, phone_number, role, zoom_username, skype_username } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      password: hashedPassword,
      gender,
      address,
      country,
      username,
      email,
      phone_number,
      role,
      zoom_username,
      skype_username,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login
export const loginUser = asynchandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    // Validate required fields
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide correct email and password.");
    }
  
    // Find user by email
    const user = await User.findOne({ email }) as UserDocument | null;
  
    if (!user) {
      res.status(400);
      throw new Error("User not found, Please sign up!");
    }
  
    // Check password
    const passwordIsValid = await bcrypt.compare(password, user.password);
  
    if (passwordIsValid) {
      // Generate token
      const token = genToken(user.id.toString()); // Convert _id (ObjectId) to string
  
      // Send cookie to server
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 24 * 60 * 60), // Expires in 1 day
        sameSite: "none",
        secure: true, // Use secure cookies in production
      });
  
      const { id,  email, role } = user;
  
      // Include the user ID in the response
      res.status(200).json({
        id: id.toString(), 
        email,
        token,
        role
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or password.");
    }
  });


 export  const logOut = asynchandler(async (_req: Request, res: Response): Promise<void> => {
    // expire the session
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(),
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ message: "you are Sucessfully logged out" });
  });









































// //getallusers
// export const getAllUsers = async (res: Response) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// //getuserbyid
// export const getUserById = async (req: Request, res: Response) => {
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' }); // Return here
//       }
//       return res.status(200).json(user); // Ensure this path also returns
//     } catch (error) {
//       return res.status(500).json({ error: error.message }); // Return in catch block
//     }
//   };
  
// //update user
// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     if (updatedData.password) {
//       updatedData.password = await bcrypt.hash(updatedData.password, 10);
//     }

//     const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
// //delete user
// export const deleteUser = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
  
//       const deletedUser = await User.findByIdAndDelete(id);
//       if (!deletedUser) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       return res.status(200).json({ message: 'User deleted successfully' });
//     } catch (error) {
//       return res.status(500).json({ error: error.message }); 
//     }
//   };
  
