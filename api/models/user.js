import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: String,
      unique: true,
      set: (username) => username.toLowerCase(),
    },
    password: {
      type: String,
      required: true,
    },
    preferences: {
      type: [String],
      default: [],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// a virtual field to create relationship between users and mealplans models
UserSchema.virtual("mealPlan", {
  ref: "MealPlan",
  localField: "_id",
  foreignField: "user_id",
});

const User = mongoose.model("User", UserSchema);

export default User;
