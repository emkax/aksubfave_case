import express from "express";

import UserController from "../controller/user.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",UserController.registerUser);
router.post("/login",UserController.loginUser);
router.put("/assignRole/:email",authMiddleware.); 


export default router;