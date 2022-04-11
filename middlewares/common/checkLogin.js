const jwt = require('jsonwebtoken');

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

// export module
module.exports = {
    checkLogin,
    redirectLogin,
};
