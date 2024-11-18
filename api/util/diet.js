const DIETS = [
    'gluten free',
    'dairy free',
    'vegan',
    'vegetarian',
    'ketogenic',
    'pescetarian',
    'primal',
    'paleolithic'
];

const validatePreferences = (preferences) => {
    return preferences.filter((preference) => !DIETS.includes(preference.toLowerCase()));
};

export { validatePreferences };
