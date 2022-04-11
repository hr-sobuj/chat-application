// external import
const express = require('express');

// internal import
const { getInbox } = require('../controller/inboxController');
const { checkLogin } = require('../middlewares/common/checkLogin');
const { decorateHtmlResponse } = require('../middlewares/common/decorateHtmlResponse');

const route = express.Router();

route.get('/', decorateHtmlResponse('Inbox'), checkLogin, getInbox);

// export module
module.exports = route;
