const helper = require("../helper");

const User = require("../models/User");
const Topic = require("../models/Topic");

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

async function getListTopicOfUser(req, res) {
    const populate = [
        {
            path: "author",
            select: "name"
        }
    ];

    let search = {};
    (req.user.isAdmin) ? search = {} : search = { author: req.user._id };

    try {
        const topicResponse = await Topic.find(search, { name: 1, createdAt: 1, updatedAt: 1, author: 1, status: 1 }).populate(populate);
        (topicResponse) ? helper.setStatusSuccess(res, topicResponse) : helper.setStatusNotFound(res, "Don't have any topic.");
    } catch (err) {
        helper.setStatusFailure(res);
    }
}

async function censoreTopic(req, res) {
    let statusPost;
    try {
        switch (req.body.action) {
            case "accept":
                statusPost = 1;
                break;
            case "reject":
                statusPost = -1;
                break;
            default:
                throw helper.setStatusBadRequest(res, "Action does not exist.");
        }

        const topicResponse = await Topic.findByIdAndUpdate(req.params.topicId, { status: statusPost });
        (topicResponse) ? helper.setStatusSuccess(res, "Action to topic successfully.") : helper.setStatusFailure(res, "Action to topic failed.");
    } catch (err) {
        if (typeof (err) === "object") helper.setStatusBadRequest(res, "Topic ID is not valid.");
    }
}

module.exports = {
    getCurrentUser,
    getListUser,
    getListTopicOfUser,
    censoreTopic
}