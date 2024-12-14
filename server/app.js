import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import mongodb from './db/connection.js';

import meals from './api/routes/meals.js';
import users from './api/routes/users.js';
import mealPlans  from './api/routes/mealPlans.js';

const app = express();
const PORT = 8080;

const options = { exposedHeader: ['Authorization'] };
app.use(cors(options));

app.use(express.json());

app.use('/meals',meals);

app.use('/users',users);

app.use('/mealPlans',mealPlans);

app.listen(PORT, async() =>{
    //connecting to MongoDB
    await mongodb.connect();

    console.log(`Server is running on port: ${PORT}`);
});