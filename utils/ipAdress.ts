import { Request } from 'express';
// Utility function to extract IP address
export const extractIpAddress = (req: Request): string => {
  // Get IP from X-Forwarded-For header or req.ip
  const forwardedFor = req.headers['x-forwarded-for'];
  const ip = forwardedFor ? 
    (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : forwardedFor[0]) : 
    req.ip;
  
  return ip || '0.0.0.0';
};