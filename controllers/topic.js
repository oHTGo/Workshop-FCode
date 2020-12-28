const { Types } = require("mongoose");
const helper = require("../helper");
const Review = require("../models/Review");

const Topic = require("../models/Topic");
const User = require("../models/User");

async function getCountPageTopic(req, res) {
    const topicResponse = await Topic.countDocuments({ status: 1 });
    try {
        (topicResponse) ? helper.setStatusSuccess(res, { countPage: Math.ceil(topicResponse / 4) }) : helper.setStatusFailure(res);
    } catch (err) {
        helper.setStatusFailure(res);
    }
}

async function getListTopic(req, res) {
    const limit = 3;

    const queryAggregate = [
        { $match: { status: 1 } }, //query match
        {
            $lookup: { //get review from userCollection
                "from": Review.collection.name,
                "localField": "review",
                "foreignField": "_id",
                "as": "review",
            }
        },
        {
            $set: //add fields
            {
                averageRate: { //calc averageRate
                    $cond: [
                        { $eq: [{ $size: "$review" }, 0] }, // if
                        0, //then
                        { $avg: "$review.star" } //else
                    ]
                },
                participantsCount: { $size: "$participants" } //calc participantsCount
            }
        },
        {
            $project: {
                "name": 1, "detail": 1, "background": 1, "date": 1,
                "averageRate": 1, "participantsCount": 1,
                "createdAt": 1, "updatedAt": 1
            }
        },
        { $sort: { date: -1 } } //sort
    ]

    try {
        let page = parseInt(req.params.numberPage);
        if (isNaN(page) || page.toString() !== req.params.numberPage) {
            throw helper.setStatusBadRequest(res, "The page number must be an integer");
        }
        const topicResponse = await Topic
            .aggregate(queryAggregate)
            .skip((page - 1) * limit) //numberPgae from 0
            .limit(limit);

        (topicResponse) ? helper.setStatusSuccess(res, topicResponse) : helper.setStatusNotFound(res, "Don't have any topic.");
    } catch (err) {
        if (typeof (err) === "object") helper.setStatusBadRequest(res);
    }
}

async function getListTopicForSchedule(req, res) {
    try {
        const topicResponse = await Topic
            .find({ status: 1 }, { name: 1, date: 1 })
            .lean();
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
    const aggregateQuery = [
        { $match: { _id: Types.ObjectId(req.params.topicId) } }, //search query
        {
            $lookup: { //get Review from User collection
                from: Review.collection.name,
                let: { review: "$review" },
                pipeline: [
                    { $match: { $expr: { $in: ["$_id", "$$review"] } } },
                    { $sort: { "updatedAt": -1 } }, //sort review.updatedAt
                    { $project: { _id: 0, star: 1, content: 1 } }
                ],
                as: "review"
            }
        },
        {
            $set: //add fields
            {
                averageRate: { //calc averageRate
                    $cond: [
                        { $eq: [{ $size: "$review" }, 0] }, // if
                        0, //then
                        { $avg: "$review.star" } //else
                    ]
                }
            }
        },
        {
            $lookup: { //get Group from userCollection
                "from": User.collection.name,
                "localField": "group",
                "foreignField": "_id",
                "as": "group",
            }
        },
        {
            $lookup: { //get Participants from userCollection
                "from": User.collection.name,
                "localField": "participants",
                "foreignField": "_id",
                "as": "participants",
            }
        },
        {
            $lookup: { //get Author from userCollection
                "from": User.collection.name,
                "localField": "author",
                "foreignField": "_id",
                "as": "author",
            }
        },
        {$unwind: "$author"},
        {
            $project: {
                group: {
                    "isAdmin": 0, "googleId": 0, "refreshToken": 0
                },
                author: {
                    "isAdmin": 0, "googleId": 0, "refreshToken": 0
                },
                participants: {
                    "isAdmin": 0, "googleId": 0, "refreshToken": 0
                }
            }
        }
    ]
    try {
        const topicResponse = await Topic
            .aggregate(aggregateQuery);

        (topicResponse[0]) ? helper.setStatusSuccess(res, topicResponse[0]) : helper.setStatusNotFound(res, "Topic doesn't exist.");

    } catch (err) {
        console.log(err);
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

async function getRanking(req, res) {
    const queryAggregate = [
        {
            $lookup: { //get review from userCollection
                "from": Review.collection.name,
                "localField": "review",
                "foreignField": "_id",
                "as": "review",
            }
        },
        {
            $set: //add fields
            {
                averageRate: { //calc averageRate
                    $cond: [
                        { $eq: [{ $size: "$review" }, 0] }, // if
                        0, //then
                        { $avg: "$review.star" } //else
                    ]
                }
            }
        },
        {
            $project: { //choose fields need to show
                "name": 1, "averageRate": 1
            }
        },
        { $sort: { averageRate: -1 } }
    ]
    try {
        const topicResponse = await Topic.aggregate(queryAggregate);
        (topicResponse) ? helper.setStatusSuccess(res, topicResponse) : helper.setStatusNotFound(res, "Don't have any topic.");
    } catch (err) {
        helper.setStatusFailure(res);
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
    getListTopicForSchedule,
    getRanking
}