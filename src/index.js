require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');

app.use(express.json());
app.use('/api', router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        app.listen(process.env.PORT, () => {
            console.log(`Server has been started on port: ${process.env.PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
