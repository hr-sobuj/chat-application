// external import
const express = require('express');

// internal import
const { getUsers, addUser } = require('../controller/usersController');
const { decorateHtmlResponse } = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require('../middlewares/users/avatarUpload');
const { addUserValidator, addUserErrorHandler } = require('../middlewares/users/userValidators');

const route = express.Router();

// user page
route.get('/', decorateHtmlResponse('Users'), getUsers);

// add user
route.post('/', avatarUpload, addUserValidator, addUserErrorHandler, addUser);

// export module
module.exports = route;
