import express from "express";

import { verifyUser } from "../middleware/authorization.js";
import { searchMeals } from "../controllers/meals.js";

const router = express.Router();
router.use(verifyUser);

// GET /meals/search
router.get("/search", searchMeals);

export default router;
