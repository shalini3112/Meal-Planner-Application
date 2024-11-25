import express from "express";

import { registerUser, loginUser, getUserById, updateDietPreferences } from "../controllers/users.js";

import { verifyUser } from "../middleware/authorization.js";
import {validatePreferences } from "../middleware/validation.js";


const router = express.Router();

//POST /users/register
router.post("/register",validatePreferences, registerUser);

//POST /users/login
router.post("/login", loginUser);

//GET /users/:id
router.get("/:id", verifyUser, getUserById);

// PUT /users/:id
router.put("/:id", verifyUser,validatePreferences ,updateDietPreferences);

export default router;
