"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractIpAddress = void 0;
const extractIpAddress = (req) => {
    const forwardedFor = req.headers['x-forwarded-for'];
    const ip = forwardedFor ?
        (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : forwardedFor[0]) :
        req.ip;
    return ip || '0.0.0.0';
};
exports.extractIpAddress = extractIpAddress;
//# sourceMappingURL=ipAdress.js.map