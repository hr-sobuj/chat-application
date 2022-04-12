// external import
const express = require('express');

// internal import
const {
    getInbox,
    searchUser,
    addConversation,
    sendMessage,
} = require('../controller/inboxController');
const { checkLogin } = require('../middlewares/common/checkLogin');
const { decorateHtmlResponse } = require('../middlewares/common/decorateHtmlResponse');
const attachmentUpload = require('../middlewares/inbox/attachmentUpload');
const { getMaxListeners } = require('../models/People');

const route = express.Router();

// get inbox
route.get('/', decorateHtmlResponse('Inbox'), checkLogin, getInbox);

// search user for conversation
route.post('/search', checkLogin, searchUser);

// add conversation
route.post('/conversation', checkLogin, addConversation);

// get messages of a conversation
route.get('/messages/:conversation_id', checkLogin, getMaxListeners);

// send message
route.post('/message', checkLogin, attachmentUpload, sendMessage);

// export module
module.exports = route;
