import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user"; // Adjust the path as needed
import dotenv from "dotenv";

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    // Check if a superadmin already exists
    const existingSuperAdmin = await User.findOne({ role: "superadmin" });
    if (existingSuperAdmin) {
      console.log("Superadmin already exists");
      return process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("SuperAdmin123!", 10);

    // Create superadmin user
    const superAdmin = new User({
      firstName: "Super",
      lastName: "Admin",
      password: hashedPassword,
      gender: "Other",
      address: "SuperAdmin Address",
      country: "Unknown",
      username: "superadmin",
      email: "superadmin@example.com",
      phone_number: "+1234567890",
      role: "superadmin"
    });

    await superAdmin.save();
    console.log("Superadmin user seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding superadmin:", error);
    process.exit(1);
  }
};

seedSuperAdmin();
