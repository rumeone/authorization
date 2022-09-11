const jwt = require('jsonwebtoken');

module.exports = (req,res, next) => {
    if(req.method === 'OPTIONS') {
        next();
    }
    try {

    } catch (e) {
        res.status(401).json({message: "User not registered"});
    }
}