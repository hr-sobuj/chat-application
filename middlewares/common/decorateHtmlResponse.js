const moment = require('moment'); // require

// decorate html page
// eslint-disable-next-line camelcase
function decorateHtmlResponse(page_title) {
    // eslint-disable-next-line func-names
    return function (req, res, next) {
        // eslint-disable-next-line camelcase
        res.locals.title = `${page_title} - Chat Application`;
        res.locals.html = true;
        res.locals.loggedInUser = {};
        res.locals.errors = {};
        res.locals.data = null;
        res.locals.moment = moment;
        next();
    };
}
// export module
module.exports = {
    decorateHtmlResponse,
};
