const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
});

const Post = sequelize.define('post', {
    author: {type: DataTypes.STRING},
    title: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING}
});

User.hasMany(Post);
Post.belongsTo(User);

module.exports = {User, Post};