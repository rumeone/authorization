const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
});

const Post = sequelize.define('post', {
    author: {type: DataTypes.STRING},
    title: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING}
});

User.hasMany(Post);
Post.belongsTo(User);

module.exports = {User, Post};