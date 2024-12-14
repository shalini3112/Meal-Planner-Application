const DIETS = [
    "gluten free",
    "dairy free",
    "vegan",
    "vegetarian",
    "ketogenic",
    "pescetarian",
    "primal",
    "paleolithic",
  ];
  
  // Middleware for validating dietary preferences
  const validatePreferences = (req, res, next) => {
    const { preferences } = req.body;
  
    if (preferences && Array.isArray(preferences)) {
      const invalidPreferences = preferences.filter(
        (preference) => !DIETS.includes(preference.toLowerCase())
      );
  
      if (invalidPreferences.length > 0) {
        return res
          .status(400)
          .json({
            error: `Invalid preferences detected: ${invalidPreferences.join(", ")}`,
          });
      }
    }
  
    next(); // if valid
  };
  
  export { validatePreferences };
  