// external import
const express = require('express');

// internal import
const { getLogin } = require('../controller/loginController');

const route = express.Router();

route.get('/', getLogin);

// export module
module.exports = route;
