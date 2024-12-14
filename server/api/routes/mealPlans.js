import express from 'express';

import { verifyUser } from '../middleware/authorization.js';

import { addMealPlan, deleteMealPlan } from '../controllers/mealPlans.js';

const router = express.Router();

router.use(verifyUser);

//POST /mealPlans
router.post('/', addMealPlan);

//DELETE /mealPlans/:id

router.delete('/:id', deleteMealPlan);

export default router;