//Init express & router
const express = require("express");
const router = express.Router();

//Init Hepler
const helper = require("../helper");

const Topic = require("../models/Topic");

const checkUserLoggedIn = require("../middleware");

/**
 * @api {get}       /topic        1.  Get lists of topic information
 * @apiGroup Topic
 * @apiSuccess (Success) {String}     status      Status of request
 * @apiSuccess (Success) {Object[]}   message   Array of object request
 * @apiSuccess (Success) {String}     object._id     ID of topic
 * @apiSuccess (Success) {String}     object.name     Name of topic
 * @apiSuccess (Success) {String}     object.detail     Detail of topic
 * @apiSuccess (Success) {String}     object.note     Note of topic
 * @apiSuccess (Success) {Date}       object.date     Date start of topic
 * @apiSuccess (Success) {Object[]}   object.group    List members of group topic
 * @apiSuccess (Success) {String}     object.group._id     ID of member's topic
 * @apiSuccess (Success) {String}     object.group.name     Name of member's topic
 * @apiSuccess (Success) {Object}     object.author    Information of author
 * @apiSuccess (Success) {String}     object.author._id     ID of author's topic
 * @apiSuccess (Success) {String}     object.author.name     Name of author's topic
 * @apiSuccess (Success) {Object[]}   object.review     Object array have 1 element. It is a average rate of topic
 *
 * @apiError (Error) {String} status      Status when complete
 * @apiError (Error) {String} message      Message when complete
 */
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
        for (let i = 0; i < topicData.length; i++) {
            let averageRate = 0;
            for (const review of topicData[i].review) {
                averageRate += review.star;
            }
            topicData[i].review = averageRate / topicData[i].review.length;
        }
        helper.setStatusSuccess(res, topicData);
    } else {
        helper.setStatusNotFound(res, "Don't have any topic");
    }
});

/**
 * @api {post}       /topic        2. Create Topic
 * @apiGroup Topic
 * @apiParam (Parameter) {String}     name       Name of topic
 * @apiParam (Parameter) {String}     detail     Detail of topic
 * @apiParam (Parameter) {String}     note       Note of topic
 * @apiParam (Parameter) {Date}       date       Date start of topic
 * @apiParam (Parameter) {Object[]}   group      Array userID is members
 *
 * @apiError (Response) {String} status      Status when complete
 * @apiError (Response) {String} message      Message when complete
 */
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

/**
 * @api {get}       /topic/:topicId       3. Get topic information
 * @apiGroup Topic
 * @apiSuccess (Success) {String}     status      Status of request
 * @apiSuccess (Success) {Object}     message   Array of object request
 * @apiSuccess (Success) {String}     object._id     ID of topic
 * @apiSuccess (Success) {String}     object.name     Name of topic
 * @apiSuccess (Success) {String}     object.detail     Detail of topic
 * @apiSuccess (Success) {String}     object.note     Note of topic
 * @apiSuccess (Success) {Date}       object.date     Date start of topic
 * @apiSuccess (Success) {Object[]}   object.group    List members of group topic
 * @apiSuccess (Success) {String}     object.group._id     ID of member's topic
 * @apiSuccess (Success) {String}     object.group.name     Name of member's topic
 * @apiSuccess (Success) {Object}     object.author    Information of author
 * @apiSuccess (Success) {String}     object.author._id     ID of author's topic
 * @apiSuccess (Success) {String}     object.author.name     Name of author's topic
 * @apiSuccess (Success) {Object[]}   object.review     Review of members
 * @apiSuccess (Success) {String}     object.review.reviewOfUser     Content of review
 * @apiSuccess (Success) {Number}     object.review.star     Star of review
 *
 * @apiError (Error) {String} status      Status when complete
 * @apiError (Error) {String} message      Message when complete
 */
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

/**
 * @api {put}       /topic/:topicId        4. Update Topic
 * @apiGroup Topic
 * @apiParam (Parameter) {String}     name       Name of topic
 * @apiParam (Parameter) {String}     detail     Detail of topic
 * @apiParam (Parameter) {String}     note       Note of topic
 * @apiParam (Parameter) {Date}       date       Date start of topic
 * @apiParam (Parameter) {Object[]}   group      Array userID is members
 *
 * @apiError (Response) {String} status      Status when complete
 * @apiError (Response) {String} message      Message when complete
 */
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

/**
 * @api {delte}       /topic/:topicId        5. Delete Topic
 * @apiGroup Topic
 * 
 * @apiError (Response) {String} status      Status when complete
 * @apiError (Response) {String} message      Message when complete
 */
router.delete("/:topicId", checkUserLoggedIn, async (req, res) => {
    const topicData = await Topic.findByIdAndRemove(req.params.topicId);

    if (topicData) {
        helper.setStatusSuccess(res, "Delete a topic successfully")
    } else {
        helper.setStatusFailure(res, "Can't delete topic");
    }
});

module.exports = router;