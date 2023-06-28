// external import
const express = require('express');

// internal import
const { getUsers, addUser, removeUser } = require('../controller/usersController');
const { checkLogin, requireRole } = require('../middlewares/common/checkLogin');
const { decorateHtmlResponse } = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require('../middlewares/users/avatarUpload');
const { addUserValidator, addUserErrorHandler } = require('../middlewares/users/userValidators');

const route = express.Router();

// user page
route.get('/', decorateHtmlResponse('Users'), checkLogin, requireRole(['admin']), getUsers);

// add user
route.post(
    '/',
    checkLogin,
    requireRole(['admin']),
    avatarUpload,
    addUserValidator,
    addUserErrorHandler,
    addUser,
);

// remove user
route.delete('/:id', checkLogin, requireRole(['admin']), removeUser);

// export module
module.exports = route;
