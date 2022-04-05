// external import
const express = require('express');

// internal import
const { getInbox } = require('../controller/inboxController');
const { decorateHtmlResponse } = require('../middlewares/common/decorateHtmlResponse');

const route = express.Router();

route.get('/', decorateHtmlResponse('Inbox'), getInbox);

// export module
module.exports = route;
