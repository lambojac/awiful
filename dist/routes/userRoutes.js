"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const forgotPassword_1 = require("../controller/forgotPassword");
const router = express_1.default.Router();
router.post('/', userController_1.createUser);
router.post('/login', userController_1.loginUser);
router.get('/logout', userController_1.logOut);
router.get("/get-all-users", userController_1.getAllUsers);
router.get("/:id/get-users-by-id", userController_1.getUserById);
router.put("/:id", userController_1.updateUser);
router.post('/forgot-password', forgotPassword_1.forgotPassword);
router.post('/reset-password', forgotPassword_1.resetPassword);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map