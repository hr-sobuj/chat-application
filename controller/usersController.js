const bcrypt = require('bcrypt');
const { unlink } = require('fs');
const path = require('path');
const User = require('../models/People');
// get users page
async function getUsers(req, res, next) {
    try {
        const users = await User.find();
        if (users) {
            res.render('users', {
                users,
            });
        }
    } catch (error) {
        next(error);
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

// remove user
async function removeUser(req, res) {
    console.log(req.params);
    try {
        const user = await User.findByIdAndDelete({
            _id: req.params.id,
        });
        if (user.avater) {
            unlink(path.join(__dirname, `../public/uploads/avatars/${user.avatar}`), (err) => {
                if (err) console.log(err);
            });
        }
        res.status(200).json({
            message: 'User Deleted successfully!',
        });
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Could not delete the user!',
                },
            },
        });
    }
}

// export module
module.exports = {
    getUsers,
    addUser,
    removeUser,
};
