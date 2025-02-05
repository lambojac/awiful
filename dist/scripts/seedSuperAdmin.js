"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const seedSuperAdmin = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        const existingSuperAdmin = await user_1.default.findOne({ role: "superadmin" });
        if (existingSuperAdmin) {
            console.log("Superadmin already exists");
            return process.exit(0);
        }
        const hashedPassword = await bcrypt_1.default.hash("SuperAdmin123!", 10);
        const superAdmin = new user_1.default({
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
    }
    catch (error) {
        console.error("Error seeding superadmin:", error);
        process.exit(1);
    }
};
seedSuperAdmin();
//# sourceMappingURL=seedSuperAdmin.js.map