const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/models');
const {Post} = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
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
            const token = generateJwt(user.id, user.email, user.role);
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
                return res.status(400).json({message: 'Error or password is empty'});
            }
            const user = await User.findOne({where: {email}});
            if(!user) {
                return res.status(400).json({message: 'User is not found'});
            }
            const comparePassword = bcrypt.compareSync(password, user.password);
            if(!comparePassword) {
                return res.status(400).json({message: 'Password is not compare'});
            }
            const token = generateJwt(user.id, user.email);
            return res.json({token});
        } catch (e) {
            console.log(e.message);
            res.status(400).json({message: 'Login error'});
        }
    }

    async findAll(req,res) {
        try {
            const users = await User.findAll();
             return res.json({users});
        } catch (e) {
            return res.status(400).json({message: 'Users is empty'});
        }
    }

    async findOne(req,res) {
        try {
            const {id} = req.body;
            console.log(id);
            const user = await User.findByPk(id);
            if(!user) {
                return res.status(400).json({message: 'User does not exist'});
            }
            return res.json({user});
        } catch (e) {
            console.log(e.message);
        }
    }

    async createPost(req,res) {
        try {
            const author = (jwt.decode(req.headers.authorization.split(' ')[1]).email);
            const {title, content} = req.body;
            if(!title || !content) {
                return res.status(400).json({message: 'Title or content cannot be empty'});
            }
            const post = await Post.create({author, title, content})
            return res.json({post});
        } catch (e) {
            console.log(e.message);
        }
    }
}


module.exports = new UserController();
