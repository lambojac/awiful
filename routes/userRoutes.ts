import express from 'express';
import { createUser, loginUser, logOut } from '../controller/userController';

const router = express.Router();

router.post('/', createUser);
router.post("/login",loginUser)
router.get("/logout",logOut)
// router.get('/', getUsers);

export default router;