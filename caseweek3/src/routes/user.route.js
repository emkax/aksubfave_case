import express from "express";

import UserController from "../controller/user.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";

import { Role } from "../generated/prisma/client/index.js";

const router = express.Router();

router.post("/register",UserController.registerUser);
router.post("/login",UserController.loginUser);
router.put("/assignRole",authMiddleware.authJWT,authMiddleware.authorize([Role.ADMIN]),UserController.assignRole); 


export default router;