// external import
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');
const path = require('path');
const { unlink } = require('fs');
const User = require('../../models/People');

const addUserValidator = [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Name is required')
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('Name must not contain anything other than alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Invalid Email Address!')
        .trim()
        .custom(async (value) => {
            // console.log(value);
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createError('Email already is use!');
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
    check('mobile')
        .isMobilePhone('bn-BD', {
            strictMode: true,
        })
        .withMessage('Mobile number must be a valid Bangladeshi mobile number')
        .custom(async (value) => {
            try {
                const user = await User.findOne({ mobile: value });
                if (user) {
                    throw createError('Mobile already is use!');
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage(
            'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'
        ),
];
// error handler
const addUserErrorHandler = (req, res, next) => {
    const error = validationResult(req);
    // console.log('error mapped', error);
    const mappedError = error.mapped();
    // console.log('mappedError', error);

    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        // removed upload file
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            console.log('user validator dirname ', __dirname);
            unlink(path.join(__dirname, `/../public/uploads/avatars/${filename}`), (err) => {
                if (err) console.log(err);
            });
        }

        // response the error
        res.status(500).json({
            errors: mappedError,
        });
    }
};

// export module
module.exports = {
    addUserValidator,
    addUserErrorHandler,
};
