# Meal Planner Application

## Overview
The **Meal Planner Application** is a web-based tool designed to help users efficiently plan their meals by selecting recipes, generating shopping lists, and tracking nutrition. It is built using **Node.js, Express.js, MongoDB, and Svelte.js**.

## Features
- **User Authentication**: Sign up, log in, and manage accounts.
- **Meal Plan Management**: Add, update, delete, and view meal plans.
- **Recipe Storage**: Save favorite recipes and access them anytime.
- **Shopping List Generator**: Automatically generate a shopping list based on selected recipes.
- **Nutritional Tracking**: Get nutritional information for meals.
- **User-Specific Plans**: Retrieve and manage meal plans based on user ID.

## Tech Stack
- **Frontend**: Svelte.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- MongoDB
- npm or yarn

## API Endpoints
### User Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user

### Meal Plans
- `GET /api/meals/:userId` - Get meal plans for a user
- `POST /api/meals` - Add a meal plan
- `PUT /api/meals/:mealId` - Update a meal plan
- `DELETE /api/meals/:mealId` - Delete a meal plan

### Recipes
- `GET /api/recipes` - Get all recipes
- `POST /api/recipes` - Add a new recipe

## Future Enhancements
- Integration with a **calorie calculator**
- **AI-based recipe suggestions**
- Mobile app version using **React Native**

## Contributors
- **Shalini Nistala**


