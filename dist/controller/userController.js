"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.logOut = exports.loginUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const genToken_1 = __importDefault(require("../utils/genToken"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, password, gender, address, country, username, email, phone_number, role, zoom_username, skype_username } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.default({
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
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createUser = createUser;
exports.loginUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide correct email and password.");
    }
    const user = await user_1.default.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User not found, Please sign up!");
    }
    const passwordIsValid = await bcrypt_1.default.compare(password, user.password);
    if (passwordIsValid) {
        const token = (0, genToken_1.default)(user.id.toString());
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 24 * 60 * 60),
            sameSite: "none",
            secure: true,
        });
        const { id, email, role, firstName, lastName, gender, address, country, username, phone_number, profilePicture } = user;
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
    }
    else {
        res.status(400);
        throw new Error("Invalid Email or password.");
    }
});
exports.logOut = (0, express_async_handler_1.default)(async (_req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(),
        sameSite: "none",
        secure: true,
    });
    res.status(200).json({ message: "you are Sucessfully logged out" });
});
const getAllUsers = async (_req, res) => {
    try {
        const users = await user_1.default.find().select("-password");
        const formattedUsers = users.map((user) => ({
            ...user.toObject(),
            status: user.isDeleted ? "non-active" : "active",
        }));
        res.status(200).json(formattedUsers);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            ...user.toObject(),
            status: user.isDeleted ? "non-active" : "active",
        });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        let updatedData = req.body;
        if (updatedData.password) {
            updatedData.password = await bcrypt_1.default.hash(updatedData.password, 10);
        }
        if (req.file) {
            const result = await cloudinary_1.default.uploader.upload(req.file.path, {
                folder: 'profile_pictures',
                transformation: [{ width: 300, height: 300, crop: 'fill' }],
            });
            updatedData.profilePicture = result.secure_url;
        }
        const updatedUser = await user_1.default.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await user_1.default.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() }, { new: true });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deactivated successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.deleteUser = deleteUser;
const restoreUser = async (req, res) => {
    try {
        const { id } = req.params;
        const restoredUser = await user_1.default.findByIdAndUpdate(id, { isDeleted: false, deletedAt: null }, { new: true });
        if (!restoredUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User reactivated successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.restoreUser = restoreUser;
//# sourceMappingURL=userController.js.map