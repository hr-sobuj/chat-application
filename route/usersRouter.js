// external import
const express = require('express');

// internal import
const { getUsers } = require('../controller/usersController');
const { decorateHtmlResponse } = require('../middlewares/common/decorateHtmlResponse');

const route = express.Router();

route.get('/', decorateHtmlResponse('Users'), getUsers);

// export module
module.exports = route;
