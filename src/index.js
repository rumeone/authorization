require('dotenv').config();
const express = require('express');
const sequelize = require('./db');

const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
    res.send("Test");
});


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true});
        app.listen(PORT, () => {
            console.log(`Server has been started on port: ${PORT}`);
        })
    } catch (e) {
        console.log(e.message);
    }
};

start();
