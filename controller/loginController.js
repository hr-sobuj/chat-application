// external import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
// internal import
const User = require('../models/People');

// get login page
function getLogin(req, res) {
    res.render('index');
}

// user login
async function login(req, res) {
    // console.log(req.body);
    try {
        const user = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }],
        });
        console.log(user);
        if (user) {
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if (isValidPassword) {
                // user object
                const userObject = {
                    // eslint-disable-next-line no-underscore-dangle
                    userid: user._id,
                    username: user.name,
                    email: user.email,
                    avatar: user.avatar || null,
                    role: user.role || 'user',
                };
                // generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE_TOKEN,
                });
                // locals
                res.locals.loggedInUser = userObject;
                // set cookie
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRE_TOKEN,
                    httpOnly: true,
                    signed: true,
                });
                res.render('inbox');
            } else {
                throw new Error(createError('Login Failed!Password not match!'));
            }
        } else {
            throw new Error(createError('User Not found!'));
        }
    } catch (error) {
        res.render('index', {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: error.message,
                },
            },
        });
    }
}

// logout
function logout(req, res) {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send('logout user');
}

// export module
module.exports = {
    getLogin,
    login,
    logout,
};
