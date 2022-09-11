const jwt = require('jsonwebtoken');

module.exports = function (role) {
    return (req,res,next) => {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token) {
                res.status(401).json({message: "User not registered"});
            }
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            if(decode.role !== role) {
                return res.status(403).json({message: "No access"});
            }
            req.user = decode;
        } catch (e) {
            res.status(401).json({message: "User not registered"});
        }
    };
};