// get users page
function getUsers(req, res) {
    res.render('users');
}

// export module
module.exports = {
    getUsers,
};
