"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Websitevist_1 = require("../controller/Websitevist");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/track/landing', Websitevist_1.landingPageIp);
router.post('/track/user', Websitevist_1.userAnalytics);
router.get('/analytics/landing/daily', Websitevist_1.landingPageVisit);
router.get('/analytics/users/monthly', Websitevist_1.userMontlyAnalytics);
router.get('/analytics/landing/details', Websitevist_1.getDetailedLandingPageVisit);
router.get('/analytics/users/details', Websitevist_1.getDetailedUserVisit);
exports.default = router;
//# sourceMappingURL=website.js.map