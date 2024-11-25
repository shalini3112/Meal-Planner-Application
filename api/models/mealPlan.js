import mongoose from "mongoose";

const MealPlanSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
  meals: [
    {
      mealId: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      diets: {
        type: [String],
        default: [],
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

// Pre-save hook to ensure max number of meals per plan allowed are not exceeded
MealPlanSchema.pre("save", async function (next) {
  // Check if meals exceed the allowed limit
  const maxMeals=3;
  if (this.meals.length > maxMeals) {
    const error = new Error(`A meal plan cannot have more than ${maxMeals} meals.`);
    return next(error);
  }
  next(); // saving the document if the condition is met
});
const MealPlan = mongoose.model("MealPlan", MealPlanSchema);

export default MealPlan;
