const Users = {
    users: [
        {
            _id: 1,
            username: 'prof_auman',
            password: 'bf25492c29533bc6d683912a99b83370:3c567d697fd851575603f3472444ac7fce9be3f74fb8d78deba09b024484c6ea',
            preferences: ['ketogenic']
        },
        {
            _id: 2,
            username: 'shalini',
            password: 'aa08549158b691a3d8f784a1992b1b73:f2e458a62489ef71056704c723f6d77e5d0573f347ecfeda30b5a98d40b52327',
            preferences: ['vegan']
        }
    ],

    find(key, value) {
        // find a user by matching a specified key and value
        return this.users.find((user) => user[key] === value);
    },

    exists(id) {
        return this.users.some((user) => user._id === id);
    },

    add(user) {
        // create a new _id based on the current users.length + 1
        const addUser = { ...user, _id: this.users.length + 1 };
        this.users.push(addUser);

        return addUser;
    },

    update(userId, preferences) {
        const user = this.find('_id', userId);

        if (!user) {
            return null;
        }

        user.preferences = preferences;
        return user;
    }
};

const MealPlans = {
    mealplans: [
        {
            _id: 1,
            user_id: 1,
            week: 1,
            meals: [
                {
                    mealId: 1591791,
                    name: 'Keto Snickerdoodle Coffee',
                    diets: ['gluten free', 'lacto ovo vegetarian', 'primal', 'ketogenic'],
                    image: 'https://img.spoonacular.com/recipes/1591791-312x231.jpg'
                },
                {
                    mealId: 1652621,
                    name: 'Keto Pancakes',
                    diets: ['gluten free', 'dairy free', 'lacto ovo vegetarian', 'ketogenic'],
                    image: 'https://img.spoonacular.com/recipes/1652621-312x231.jpg'
                }
            ]
        },
        {
            _id: 2,
            user_id: 2,
            week: 1,
            meals: [
                {
                    mealId: 660101,
                    name: 'Simple Garlic Pasta',
                    diets: [ 'dairy free', 'lacto ovo vegetarian', 'vegan'],
                    image: 'https://img.spoonacular.com/recipes/660101-312x231.jpg'
                },
                {
                    mealId: 1096053,
                    name: 'GF Vegan Creamy Broccoli Pasta',
                    diets: ['gluten free', 'dairy free', 'lacto ovo vegetarian', 'vegan'],
                    image: 'https://img.spoonacular.com/recipes/1096053-312x231.jpg'
                }
            ]
        }
    ],

    findAll(userId) {
        // find all meal plans associated to a user by user_id
        return this.mealplans.filter((mealplan) => mealplan.user_id === userId);
    },

    find(userId, week) {
        // find a meal plan by user_id and week
        return this.mealplans.find((mealplan) => mealplan.user_id === userId && mealplan.week === week);
    },

    add(mealplan, mealplanId) {
        // if mealplanId is provided then we find the existing meal plan and add a meal
        if (mealplanId) {
            const idx = this.mealplans.findIndex((mealplan) => mealplan._id === mealplanId);

            this.mealplans[idx].meals.push(mealplan.meal);
            return this.mealplans[idx];
        }

        // if no mealplanId is provided then we know we need to create a new meal plan with the meal
        const addMealPlan = {
            _id: this.mealplans.length + 1,
            user_id: mealplan.user_id,
            week: mealplan.week,
            meals: [mealplan.meal]
        };
        this.mealplans.push(addMealPlan);

        return addMealPlan;
    },

    delete(mealplanId) {
        this.mealplans = this.mealplans.filter((mealplan) => mealplan._id !== mealplanId);

        return mealplanId;
    }
};

export { Users, MealPlans };
