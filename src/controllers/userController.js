const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/models');

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
};

class UserController {
    async registration(req,res) {
        try {
            console.log(req.body);
            const {email, password} = req.body;
            if(!email || !password) {
                return res.status(400).json("Email or password is empty");
            }
            const candidate = await User.findOne({where: {email}});
            if(candidate) {
                return res.status(400).json({message: 'A user with the same name already exists'});
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({email, password: hashPassword});
            const token = generateJwt(user.id, user.email);
            return res.json({token});
        } catch (e) {
            console.log(e.message);
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req,res) {
        try {
            const {email, password} = req.body;
            if(!email || !password) {
                return res.status(400).json("Email or password is empty");
            }
            const user = await User.findOne({where: {email}});
            if(!user) {
                return res.status(400).json({message: 'User is not found'});
            }
            const comparePassword = bcrypt.compare(password, user.password);
            if(!comparePassword) {
                return res.status(400).json({message: 'Passwords is not compare'});
            }
            const token = generateJwt(user.id, user.email);
            return res.json({token});
        } catch (e) {
            console.log(e.message);
            res.status(400).json({message: 'Login error'});
        }
    }
}

module.exports = new UserController();
