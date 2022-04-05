// get login page
function getLogin(req, res) {
    res.render('index', {
        title: 'Login - Chat Application',
    });
}

// export module
module.exports = {
    getLogin,
};
