const helper = require("../helper");

const Topic = require("../models/Topic");
const Review = require("../models/Review");

async function getReview(req, res) {
    const search = { user: req.user._id, topic: req.params.topicId };

    try {
        const reviewResponse = await Review.findOne(search, { user: 0, topic: 0, refreshToken: 0 });
        (reviewResponse) ? helper.setStatusSuccess(res, reviewResponse) : helper.setStatusNotFound(res, "Don't find review.");
    } catch (err) {
        helper.setStatusBadRequest(res, "Topic ID is not valid.");
    }
}

async function createReview(req, res) {
    const existReviewSearch = { user: req.user._id, topic: req.params.topicId };

    try {
        const existReviewResponse = await Review.findOne(existReviewSearch);
        if (existReviewResponse) throw helper.setStatusForbiddance(res, "Each user can only create one review.");

        const newReview = new Review({
            user: req.user._id,
            star: req.body.star,
            content: req.body.content,
            topic: req.params.topicId
        });

        const validateReview = newReview.validateSync();
        if (validateReview) throw helper.setStatusBadRequest(res, validateReview._message);

        const options = { new: true, omitUndefined: true, runValidators: true };
        const topicResponse = await Topic.findByIdAndUpdate(req.params.topicId, { $push: { review: newReview._id } }, options);
        if (!topicResponse) throw helper.setStatusNotFound(res, "Don't find topic.");

        const reviewResponse = await newReview.save();
        (reviewResponse) ? helper.setStatusSuccess(res, "Create a review successfully.") : helper.setStatusFailure(res, "Create review failed.");
    } catch (err) {
        if (typeof (err) === "object") helper.setStatusBadRequest(res, "Topic ID is not valid.");
    }
}

async function updateReview(req, res) {
    const updateReview = {
        star: req.body.star,
        content: req.body.content
    };
    const search = { user: req.user._id, topic: req.params.topicId };
    const options = { new: true, omitUndefined: true, runValidators: true };

    try {
        const reviewResponse = await Review.findOneAndUpdate(search, updateReview, options);
        (reviewResponse) ? helper.setStatusSuccess(res, "Update a review successfully.") : helper.setStatusFailure(res, "Update review failed.");
    } catch (err) {
        if (err._message) {
            helper.setStatusBadRequest(res, err._message);
        } else {
            helper.setStatusBadRequest(res, "Topic ID is not valid.");
        }
    }
}

async function deleteReview(req, res) {
    const search = { user: req.user._id, topic: req.params.topicId };
    try {
        const reviewResponse = await Review.findOneAndRemove(search);
        if (reviewResponse) {
            await Topic.findByIdAndUpdate(reviewResponse.topic, { $pullAll: { review: [reviewResponse._id] } });
            helper.setStatusSuccess(res, "Delete a review successfully.");
        } else {
            helper.setStatusFailure(res, "Delete review failed.");
        }
    } catch (err) {
        if (typeof (err) === "object") helper.setStatusBadRequest(res, "Topic ID is not valid.");
    }
}
module.exports = {
    getReview,
    createReview,
    updateReview,
    deleteReview
}