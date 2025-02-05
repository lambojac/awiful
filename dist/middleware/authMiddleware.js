"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Secure = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        console.log("Authorization Header:", req.headers.authorization);
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401);
            throw new Error("Not authorized, token missing or invalid");
        }
        const token = authHeader.split(" ")[1];
        console.log("Token Extracted:", token);
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"],
        });
        console.log("Verified Token:", verified);
        const user = await user_1.default.findById(verified.userId).select("-password");
        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Authentication Error:", error);
        res.status(401);
        throw new Error("Not authorized, please login");
    }
});
exports.default = Secure;
//# sourceMappingURL=authMiddleware.js.map