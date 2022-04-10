const bcrypt = require('bcrypt');
const User = require('../models/People');

// get users page
async function getUsers(req, res, next) {
    try {
        const users = await User.find();
        res.render('users', {
            users,
        });
    } catch (err) {
        next(err);
    }
}

// add user
const addUser = async (req, res) => {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword,
        });
    } else {
        newUser = new User({
            ...req.body,
            password: hashedPassword,
        });
    }

    // save user or send error
    try {
        const result = await newUser.save();
        if (result) {
            res.status(200).json({
                status: 1,
                message: 'User was added successfully!',
            });
        } else {
            res.status(500).json({
                status: 0,
                message: 'Error',
            });
        }
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Unknown error occured!',
                },
            },
        });
    }
};

// export module
module.exports = {
    getUsers,
    addUser,
};
