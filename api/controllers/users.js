import User from "../models/user.js";

import { validatePreferences } from "../util/diet.js";

import { hash, compare, signToken } from "../util/auth.js";

const registerUser = async (req, res) => {
  try {
    const { username, password, preferences } = req.body;

    if (!username || !password) {
      return res
        .status(422)
        .json({ error: "Must provide both username and password" });
    }

    // Validating the dietary preferences
    const invalidPreferences = validatePreferences(preferences);
    if (invalidPreferences.length) {
      return res
        .status(400)
        .json({ error: `Invalid dietary preferences: ${invalidPreferences}` });
    }

    const hashedPassword = await hash(password);
    const userEntry = await User.create({
      username,
      password: hashedPassword,
      preferences,
    });

    res.json({
      _id: userEntry._id,
      username: userEntry.username,
      preferences: userEntry.preferences,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(422)
        .json({ error: "Must provide both username and password" });
    }

    const userEntry = await User.findOne({ username: username.toLowerCase() });

    if (!userEntry) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const passwordEqual = await compare(password, userEntry.password);

    if (!passwordEqual) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = signToken(userEntry.username, userEntry._id);

    res.json({
      _id: userEntry._id,
      username: userEntry.username,
      preferences: userEntry.preferences,
      token_type: "Bearer",
      access_token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.verified;
    // Check if the user_id in headers matches the id parameter
    if (id !== user_id) {
      return res.status(403).json({ error: "Forbidden user." });
    }

    const userWithMealplan = await User.findById(id)
      .select("-password")
      .populate("mealPlan");

    res.json(userWithMealplan);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const updateDietPreferences = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.verified;
    const { preferences } = req.body;

    // Check if the user_id in headers matches the id parameter
    if (id !== user_id) {
      return res.status(403).json({ error: "Forbidden user." });
    }

    // Validating the dietary preferences
    const invalidPreferences = validatePreferences(preferences);
    if (invalidPreferences.length) {
      return res
        .status(400)
        .json({ error: `Invalid dietary preferences: ${invalidPreferences}` });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { preferences }, // Set the new preferences array
      { new: true } // Return the updated document
    ).select("-password"); // excluding the password field from the result

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export { registerUser, loginUser, getUserById, updateDietPreferences };
