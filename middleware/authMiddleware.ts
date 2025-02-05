import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

interface JWTDecoded {
    userId: string;
}

const Secure = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Log the Authorization header to verify if it's being passed correctly
            console.log("Authorization Header:", req.headers.authorization);

            const authHeader = req.headers.authorization;

            // Check if the authorization header exists and starts with 'Bearer'
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                res.status(401);
                throw new Error("Not authorized, token missing or invalid");
            }

            // Extract the token from the header
            const token = authHeader.split(" ")[1];

            // Log the token for debugging purposes
            console.log("Token Extracted:", token);

            // Verify the token using the JWT secret
            const verified = jwt.verify(token, process.env.JWT_SECRET as string, {
                algorithms: ["HS256"],
            }) as JWTDecoded;

            // Log the decoded token for debugging
            console.log("Verified Token:", verified);

            // Find the user by the ID in the token and exclude the password field
            const user = await User.findById(verified.userId).select("-password");

            if (!user) {
                res.status(401);
                throw new Error("User not found");
            }

            // Attach the user to the request object (by bypassing TypeScript error)
            (req as any).user = user;

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            // Log the error for visibility
            console.error("Authentication Error:", error);

            res.status(401);
            throw new Error("Not authorized, please login");
        }
    }
);

export default Secure;
