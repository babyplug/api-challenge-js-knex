const db = require('../../config/db')
const USER_SERVICE = require('../users')

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT_WORK_FACTOR = 10;

const register = () => async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
        const hashPassword = bcrypt.hashSync(password, SALT_WORK_FACTOR);
        const dto = { username, email, password: hashPassword };
        await USER_SERVICE.createUser(dto)
        return res.status(201).json({ status: 'OK', success: true});
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'error',
        })
    }
}

const login = () => async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const _users = await USER_SERVICE.getUserByUsernameAndDeleted(username)
        if (_users && _users.length > 0) {
            const _user = _users[0]
            if (bcrypt.compareSync(password, _user.password)) {
                const userJWT = {
                    username: _user.username,
                    id: _user.id
                }
    
                const token = jwt.sign(userJWT, config.secret, {
                    expiresIn: "1d"
                });
            
                return res.json({
                    prefix: 'Bearer',
                    token: token 
                });
            }
        }
        return res.status(401).json({
            status: 'OK',
            message: 'Username or password not correct !'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'error',
        })
    }
}

module.exports = {
    register,
    login,
}