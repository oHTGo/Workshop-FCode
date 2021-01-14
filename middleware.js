//Init Helper
const helper = require("./helper");

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
    req.user ? next() : helper.setStatusUnauthorization(res, "You are not logged in");
}

module.exports = checkUserLoggedIn;