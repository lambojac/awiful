"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.loginUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const genToken_1 = __importDefault(require("../utils/genToken"));
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
        const { id, email, role } = user;
        res.status(200).json({
            id: id.toString(),
            email,
            token,
            role
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
//# sourceMappingURL=userController.js.map