//Init express & router
const express = require("express");
const router = express.Router();

//Init Hepler
const helper = require("../helper");

const Topic = require("../models/Topic");

const checkUserLoggedIn = require("../middleware");

//Get list of topic
router.get("/", checkUserLoggedIn, async (req, res) => {
    const populateData = [
        {
            path: "author",
            select: "name"
        },
        {
            path: "review",
            select: "star"
        },
        {
            path: "group",
            select: "name"
        }
    ];

    const topicData = await Topic.find().populate(populateData);

    if (topicData) {
        helper.setStatusSuccess(res, topicData);
    } else {
        helper.setStatusNotFound(res, "Don't have any topic");
    }
});

//Create topic
router.post("/", checkUserLoggedIn, (req, res) => {

    const topic = new Topic({
        name: req.body.name,
        detail: req.body.detail,
        note: req.body.note,
        date: req.body.date,
        group: req.body.group,
        author: req.user._id
    });

    topic.save()
        .then(topicData => {
            if (topicData) {
                helper.setStatusSuccess(res, "Create a topic successfully");
            } else {
                helper.setStatusFailure(res, "Can't create topic");
            }
        })
        .catch(err => helper.setStatusBadRequest(res, err._message));
});

//Get topic
router.get("/:topicId", checkUserLoggedIn, async (req, res) => {
    const populateData = [
        {
            path: "author",
            select: "name"
        },
        {
            path: "review",
            select: "star reviewOfUser"
        },
        {
            path: "group",
            select: "name"
        }
    ];

    const topicData = await Topic.findById(req.params.topicId).populate(populateData);

    if (topicData) {
        helper.setStatusSuccess(res, topicData);
    } else {
        helper.setStatusNotFound(res, "Don't find topic");
    }
});

//Update topic
router.put("/:topicId", checkUserLoggedIn, (req, res) => {
    const findData = { _id: req.params.topicId, author: req.user._id };

    const topic = {
        name: req.body.name,
        detail: req.body.detail,
        note: req.body.note,
        group: req.body.group,
        date: req.body.date
    };

    const options = { new: true, omitUndefined: true, runValidators: true };

    Topic.findOneAndUpdate(findData, topic, options)
        .then(topicData => {
            if (topicData) {
                helper.setStatusSuccess(res, "Update a topic successfully");
            } else {
                helper.setStatusFailure(res, "Can't update topic");
            }
        })
        .catch(err => helper.setStatusBadRequest(res, err._message));

});

router.delete("/:topicId", checkUserLoggedIn, async (req, res) => {
    const topicData = await Topic.findByIdAndRemove(req.params.topicId);

    if (topicData) {
        helper.setStatusSuccess(res, "Delete a topic successfully")
    } else {
        helper.setStatusFailure(res, "Can't delete topic");
    }
});

module.exports = router;