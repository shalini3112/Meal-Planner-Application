import MealPlan from "../models/mealPlan.js";

const addMealPlan = async (req, res) => {
  {
    try {
      const { user_id } = req.verified;
      const { week, meals } = req.body;

      // Finding existing meal plan by user_id and week
      const existingMealPlan = await MealPlan.findOne({
        user_id: user_id,
        week: week,
      });
      // If meal plan exists, check for max meals
      if (existingMealPlan) {
        // Check if the meal plan already has 3 meals
        if (existingMealPlan.meals.length >= 3) {
          return res
            .status(400)
            .json({ error: "Meal plan already contains 3 meals." });
        }

        // Add new meal to the existing meal
        existingMealPlan.meals.push(
          ...meals.map((meal) => ({
            mealId: meal.mealId,
            name: meal.name,
            diets: meal.diets,
            image: meal.image,
          }))
        );

        await existingMealPlan.save();
        return res.json(existingMealPlan);
      }
      //  Create a new meal plan if it doesn't exist
      const newMealPlan = new MealPlan({
        week,
        meals: meals.map((meal) => ({
          mealId: meal.mealId,
          name: meal.name,
          diets: meal.diets,
          image: meal.image,
        })),
      });
      newMealPlan.user_id = user_id;

      await newMealPlan.save();
      return res.json(newMealPlan); // Return the created meal plan
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
};

const deleteMealPlan = async (req, res) => {
  try {
    const { user_id } = req.verified;
    const { id } = req.params;

    // Fetching the mealPlan based on id
    const mealPlan = await MealPlan.findById(id);
    console.log(mealPlan);
    // checking if mealPlan exists
    if (!mealPlan) {
      return res.status(404).json({ error: "Meal plan not found." });
    }

    if (mealPlan.user_id.toString() !== user_id) {
      return res.status(403).json({ error: "User ID does not match." });
    }

    await mealPlan.deleteOne();

    res.json({ mealPlanId: mealPlan._id, delete: "success" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export { addMealPlan, deleteMealPlan };
