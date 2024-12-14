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

const MealPlan = mongoose.model("MealPlan", MealPlanSchema);

export default MealPlan;
