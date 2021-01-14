//Init Helper
const helper = require("./helper");

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
    req.user ? next() : helper.setStatusUnauthorization(res, "You are not logged in.");
}

const checkAdmin = (req, res, next) => {
    req.user.isAdmin ? next() : helper.setStatusUnauthorization(res, "You are not admin.");
}

module.exports = {
    checkUserLoggedIn,
    checkAdmin
};