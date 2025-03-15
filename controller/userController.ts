import { Request, Response } from 'express';
import User from '../models/user'; 
import bcrypt from 'bcrypt';
import asynchandler from "express-async-handler";
import genToken from "../utils/genToken";
import { UserDocument } from '../models/user';
import cloudinary from '../config/cloudinary';

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
  
      const { id,  email, role, firstName,
        lastName,
        gender,
        address,
        country,
        username, 
        phone_number, profilePicture} = user;
  
      // Include the user ID in the response
      res.status(200).json({
        id: id.toString(), 
        email,
        token,
        role,
        firstName,
         lastName,
         gender,
         address,
         country,
         username, 
         phone_number,
         profilePicture
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




//getallusers
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.find();
  
      // Transform data to match required format
      const formattedUsers = users.map((user) => ({
        user_name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        date_created: new Date(user.date_created).toISOString().split("T")[0], 
        phone: user.phone_number,
        user_role: user.role,
        user_id: user._id.toString(),
        status: user.isDeleted ? "non-active" : "active",
      }));
  
      res.status(200).json(formattedUsers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };


//getuserbyid
export const getUserById = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' }); 
      }
      return res.status(200).json({
        ...user.toObject(), // Convert Mongoose document to plain object
        status: user.isDeleted ? "non-active" : "active", // Set status
      }); 
    } catch (error) {
      return res.status(500).json({ error: error.message }); 
    }
  };
  
//update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let updatedData = req.body;

    // Handle password update
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    // Check if a profile picture is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profile_pictures', // Optional: Store in a specific folder
        transformation: [{ width: 300, height: 300, crop: 'fill' }], // Resize if needed
      });
      updatedData.profilePicture = result.secure_url; // Store the URL in the database
    }

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// //delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deactivated successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// restore user
export const restoreUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const restoredUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: false, deletedAt: null },
      { new: true }
    );

    if (!restoredUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User reactivated successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
