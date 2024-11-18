import axios from "axios";

import User from "../models/user.js";

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_API_URL = process.env.SPOONACULAR_API_URL;

const searchMeals = async (req, res) => {
  try {
    const { meal } = req.query;
    const { user_id } = req.verified;

    const user = await User.findById(user_id);
    
    const dietPreferences = user.preferences.length
      ? user.preferences.join(",")
      : "";

    const meals = await axios.get(
      `${SPOONACULAR_API_URL}/recipes/complexSearch`,
      {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          query: meal,
          diet: dietPreferences,
          addRecipeInformation: true,
        },
      }
    );
    const mealData = meals.data.results.map((meal) => {
      return {
        id: meal.id,
        title: meal.title,
        image: meal.image,
        diets: meal.diets, // This contains the diets the meal falls into
      };
    });
    res.json(mealData);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export { searchMeals };
