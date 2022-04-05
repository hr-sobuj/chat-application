// decorate html page
// eslint-disable-next-line camelcase
function decorateHtmlResponse(page_title) {
    // eslint-disable-next-line func-names
    return function (req, res, next) {
        // eslint-disable-next-line camelcase
        res.locals.title = `${page_title} - Chat Application`;
        res.locals.html = true;
        next();
    };
}
// export module
module.exports = {
    decorateHtmlResponse,
};
