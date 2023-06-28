const jwt = require('jsonwebtoken');
const createError = require('http-errors');

function checkLogin(req, res, next) {
    const cookie = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    // console.log(cookie);
    if (cookie) {
        try {
            const token = cookie[process.env.COOKIE_NAME];
            // console.log(token);
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;
            if (res.locals.html) {
                res.locals.loggedInUser = decode;
            }
            next();
        } catch (error) {
            if (res.locals.html) {
                res.redirect('/');
            } else {
                res.status(401).json({
                    error: 'Authetication failure!',
                });
            }
        }
    } else if (res.locals.html) {
        res.redirect('/');
    } else {
        res.status(401).json({
            error: 'Authetication failure!',
        });
    }
}

function redirectLogin(req, res, next) {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (!cookies) {
        next();
    } else {
        res.redirect('/inbox');
    }
}

// guard to protect routes that need role based authorization
function requireRole(role) {
    return function (req, res, next) {
        if (req.user.role && role.includes(req.user.role)) {
            next();
        } else if (res.locals.html) {
            next(createError(401, 'You are not authorized to access this page!'));
        } else {
            res.status(401).json({
                errors: {
                    common: {
                        msg: 'You are not authorized!',
                    },
                },
            });
        }
    };
}

// export module
module.exports = {
    checkLogin,
    redirectLogin,
    requireRole,
};
