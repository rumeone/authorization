const jwt = require('jsonwebtoken');

module.exports = (req,res, next) => {
    if(req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            res.status(400).json({message: "User not registered"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next()
    } catch (e) {
        res.status(400).json({message: "User not registered"});
    }
}