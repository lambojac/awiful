import jwt from 'jsonwebtoken';

// Utility to generate JWT
const genToken = (userId: string): string => {
  const secretKey = process.env.JWT_SECRET; // Access the secret from environment variables

  if (!secretKey) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  return jwt.sign({ userId }, secretKey, { expiresIn: '1d' }); // Example with 1 day expiration
};

export default genToken;
