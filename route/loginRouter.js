// external import
const express = require('express');

// internal import
const { getLogin, login, logout } = require('../controller/loginController');
const { checkLogin, redirectLogin } = require('../middlewares/common/checkLogin');
const { decorateHtmlResponse } = require('../middlewares/common/decorateHtmlResponse');
const {
    doLoginValidators,
    doLoginValidationHander,
} = require('../middlewares/login/loginValidators');

const route = express.Router();

// set page title
const pageTitle = 'Login';

// get login page
route.get('/', decorateHtmlResponse(pageTitle), redirectLogin, getLogin);

// login user
route.post('/', decorateHtmlResponse(pageTitle), doLoginValidators, doLoginValidationHander, login);

// logout user
route.delete('/', checkLogin, logout);

// export module
module.exports = route;
