//Init express & router
const express = require("express");
const router = express.Router();

//Init Hepler
const helper = require("../helper");

const Topic = require("../models/Topic");
const Review = require("../models/Review");

const checkUserLoggedIn = require("../middleware");

//Get review
router.get("/:topicId", checkUserLoggedIn, async (req, res) => {

    const findData = { user: req.user._id, topic: req.params.topicId };

    const reviewData = await Review.findOne(findData);

    if (reviewData) {
        helper.setStatusSuccess(res, reviewData);
    } else {
        helper.setStatusNotFound(res, "Don't find review");
    }
});

//Create review
router.post("/:topicId", checkUserLoggedIn, (req, res) => {
    Review.find({ user: req.user._id, topic: req.params.topicId })
        .then(async data => {

            if (data.length != 0) { //check User used to create review for this topic
                helper.setStatusForbiddance(res, "Each user can only create one review");
                return;
            }

            const newReview = new Review({
                user: req.user._id,
                star: req.body.star,
                reviewOfUser: req.body.reviewOfUser,
                topic: req.params.topicId
            });

            const validateReview = newReview.validateSync();
            if (validateReview) {
                helper.setStatusBadRequest(res, validateReview._message)
            }

            const options = { new: true, omitUndefined: true, runValidators: true };

            const topicData = await Topic.findByIdAndUpdate(req.params.topicId, { $push: { review: newReview._id } }, options);

            if (!topicData) {
                helper.setStatusNotFound(res, "Don't find topic");
                return;
            }

            await newReview.save()
                .then(reviewData => {
                    if (reviewData) {
                        helper.setStatusSuccess(res, "Create a review successfully");
                    } else {
                        helper.setStatusFailure(res, "Can't create review");
                    }
                })
                .catch(err => helper.setStatusBadRequest(res, err._message));
        });
});

//Update review
router.put("/:topicId", checkUserLoggedIn, async (req, res) => {
    const newReview = {
        star: req.body.star,
        reviewOfUser: req.body.reviewOfUser
    };


    const findData = { user: req.user._id, topic: req.params.topicId };

    const options = { new: true, omitUndefined: true, runValidators: true };

    await Review.findOneAndUpdate(findData, newReview, options)
        .then(reviewData => {
            if (reviewData) {
                helper.setStatusSuccess(res, "Update a review successfully");
            } else {
                helper.setStatusFailure(res, "Can't update review");
            }
        })
        .catch(err => helper.setStatusBadRequest(res, err._message));
});

//Delete review
router.delete("/:topicId", checkUserLoggedIn, async (req, res) => {
    const findData = { user: req.user._id, topic: req.params.topicId };

    const reviewData = await Review.findOneAndRemove(findData);

    if (reviewData) {
        helper.setStatusSuccess(res, "Delete a review successfully");
    } else {
        helper.setStatusFailure(res, "Can't delete review");
    }
});

module.exports = router;