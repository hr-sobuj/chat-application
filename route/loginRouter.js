// external import
const express = require('express');

// internal import
const { getLogin, login } = require('../controller/loginController');
const { decorateHtmlResponse } = require('../middlewares/common/decorateHtmlResponse');
const {
    doLoginValidators,
    doLoginValidationHander,
} = require('../middlewares/login/loginValidators');

const route = express.Router();

// set page title
const pageTitle = 'Login';

// get login page
route.get('/', decorateHtmlResponse(pageTitle), getLogin);

// login user
route.post('/', decorateHtmlResponse(pageTitle), doLoginValidators, doLoginValidationHander, login);

// export module
module.exports = route;
