const helper = require("../helper");

const User = require("../models/User");

async function getCurrentUser(req, res) {
    let userResponse = req.user;
    userResponse.isAdmin = undefined; userResponse.googleId = undefined; userResponse.refreshToken = undefined;
    helper.setStatusSuccess(res, userResponse);
}

async function getListUser(req, res) {
    try {
        const userResponse = await User.find({}, { isAdmin: 0, googleId: 0, refreshToken: 0 });
        if (userResponse) helper.setStatusSuccess(res, userResponse);
    } catch (err) {
        helper.setStatusFailure(res, "Error from server.");
    }
}

module.exports = {
    getCurrentUser,
    getListUser
}