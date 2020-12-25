const helper = require("../helper");

const Topic = require("../models/Topic");

async function getCountPageTopic(req, res) {
    const topicResponse = await Topic.countDocuments({ status: 1 });
    try {
        (topicResponse) ? helper.setStatusSuccess(res, { countPage: Math.round(topicResponse / 4) }) : helper.setStatusFailure(res);
    } catch (err) {
        helper.setStatusFailure(res);
    }
}

async function getListTopic(req, res) {
    const limit = 4;

    const populate = [
        {
            path: "author participants group",
            select: "name"
        },
        {
            path: "review",
            select: "star"
        }
    ];

    try {
        let page = parseInt(req.params.numberPage);
        if (isNaN(page) || page.toString() !== req.params.numberPage) {
            throw helper.setStatusBadRequest(res, "The page number must be an integer");
        }
        const topicResponse = await Topic.find({ status: 1 }, { status: 0 })
            .skip((page - 1) * limit) //numberPgae from 0
            .limit(limit)
            .populate(populate);

        for (let i = 0; i < topicResponse.length; i++) {
            let averageRate = 0;
            for (const review of topicResponse[i].review) {
                averageRate += review.star / topicResponse[i].review.length;
            }
            topicResponse[i].review = averageRate;
            topicResponse[i].participants = topicResponse[i].participants.length;
        }


        (topicResponse) ? helper.setStatusSuccess(res, topicResponse) : helper.setStatusNotFound(res, "Don't have any topic.");
    } catch (err) {
        if (typeof (err) === "object") helper.setStatusBadRequest(res, "Topic ID is not valid.");
    }
}

async function getListTopicForSchedule(req, res) {
    const topicResponse = await Topic.find({ status: 1 }, { name: 1, date: 1 });
    try {
        (topicResponse) ? helper.setStatusSuccess(res, topicResponse) : helper.setStatusNotFound(res, "Don't have any topic.");
    } catch (err) {
        helper.setStatusFailure(res);
    }
}

async function createTopic(req, res) {
    const newTopic = new Topic({
        name: req.body.name,
        detail: req.body.detail,
        note: req.body.note,
        background: req.body.background,
        date: req.body.date,
        group: req.body.group,
        participants: [],
        review: [],
        author: req.user._id
    });

    try {
        const topicResponse = await newTopic.save();
        (topicResponse) ? helper.setStatusSuccess(res, "Create a topic successfully.") : helper.setStatusFailure(res, "Create a topic failed.");
    } catch (err) {
        helper.setStatusBadRequest(res, err._message);
    }
}

async function getTopic(req, res) {
    const populate = [
        {
            path: "author participants group",
            select: "name"
        },
        {
            path: "review",
            select: "star reviewOfUser"
        }
    ];

    try {
        const topicResponse = await Topic.findById(req.params.topicId, { status: 0 }).populate(populate);

        (topicResponse) ? helper.setStatusSuccess(res, topicResponse) : helper.setStatusNotFound(res, "Topic doesn't exist.");

    } catch (err) {
        helper.setStatusBadRequest(res, "Topic ID is not valid.");
    }
}

async function updateTopic(req, res) {
    const search = { _id: req.params.topicId, author: req.user._id };
    const update = {
        name: req.body.name,
        detail: req.body.detail,
        note: req.body.note,
        background: req.body.background,
        group: req.body.group,
        date: req.body.date,
        status: 0
    };
    const options = { new: true, omitUndefined: true, runValidators: true };

    try {
        const topicResponse = await Topic.findOneAndUpdate(search, update, options);
        (topicResponse) ? helper.setStatusSuccess(res, "Update a topic successfully.") : helper.setStatusFailure(res, "Update a topic failed.");
    } catch (err) {
        (err._message) ? helper.setStatusBadRequest(res, err._message) : helper.setStatusBadRequest(res, "Topic ID is not valid");
    }
}

async function deleteTopic(req, res) {
    const search = { _id: req.params.topicId, author: req.user._id };
    try {
        const topicResponse = await Topic.findOneAndRemove(search);
        (topicResponse) ? helper.setStatusSuccess(res, "Delete a topic successfully.") : helper.setStatusFailure(res, "Delete a topic failed.");
    } catch (err) {
        helper.setStatusBadRequest(res, "Topic ID is not valid.");
    }
}

async function joinTopic(req, res) {
    try {
        let topicResponse = await Topic.findById(req.params.topicId);
        if (!topicResponse) throw helper.setStatusNotFound(res, "Topic doesn't exist.");
        if (!topicResponse.participants.includes(req.user._id)) {
            topicResponse = await Topic.findByIdAndUpdate(req.params.topicId, { $push: { participants: req.user._id } });
            (topicResponse) ? helper.setStatusSuccess(res, "Join topic successfully.") : helper.setStatusFailure(res, "Join topic failed.");
        } else {
            topicResponse = await Topic.findByIdAndUpdate(req.params.topicId, { $pullAll: { participants: [req.user._id] } });
            (topicResponse) ? helper.setStatusSuccess(res, "Unjoin topic successfully.") : helper.setStatusFailure(res, "Unjoin topic failed.");
        }
    } catch (err) {
        if (typeof (err) === "object") helper.setStatusBadRequest(res, "Topic ID is not valid.");
    }
}

async function checkStatusParticipant(req, res) {
    try {
        let topicResponse = await Topic.findById(req.params.topicId);
        if (!topicResponse) throw helper.setStatusNotFound(res, "Topic doesn't exist.");
        if (!topicResponse.participants.includes(req.user._id)) {
            helper.setStatusSuccess(res, { statusParticipant: false });
        } else {
            helper.setStatusSuccess(res, { statusParticipant: true });
        }
    } catch (err) {
        if (typeof (err) === "object") helper.setStatusBadRequest(res, "Topic ID is not valid.");
    }
}

module.exports = {
    getListTopic,
    createTopic,
    getTopic,
    updateTopic,
    deleteTopic,
    joinTopic,
    checkStatusParticipant,
    getCountPageTopic,
    getListTopicForSchedule
}