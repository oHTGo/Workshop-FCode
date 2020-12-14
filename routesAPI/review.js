//Init express & router
const express = require("express");
const router = express.Router();

//Init Hepler
const helper = require("../helper");

const Topic = require("../models/Topic");
const Review = require("../models/Review");

const checkUserLoggedIn = require("../middleware");
const reviewController = require("../controllers/review");

/**
 * @api {get}       /review/:topicId        1.  Get review
 * @apiGroup Review
 * @apiSuccess (Success) {String}     status      Status of request
 * @apiSuccess (Success) {Object}   message   Object request
 * @apiSuccess (Success) {String}     object._id     ID of review
 * @apiSuccess (Success) {Number}     object.star     Star of review
 * @apiSuccess (Success) {String}     object.reviewOfUser       Content of review
 *
 * @apiError (Error) {String} status      Status when complete
 * @apiError (Error) {String} message      Message when complete
 */
router.get("/:topicId", checkUserLoggedIn, reviewController.getReview);


/**
 * @api {post}       /review/:topicId        2. Create review
 * @apiGroup Review
 * @apiParam (Parameter) {Number}     star       Star of review (1 <= star <= 5)
 * @apiParam (Parameter) {String}     reviewOfUser     Content of review
 *
 * @apiError (Response) {String} status      Status when complete
 * @apiError (Response) {String} message      Message when complete
 */
router.post("/:topicId", checkUserLoggedIn, reviewController.createReview);

/**
 * @api {put}       /review/:topicId        3. Update review
 * @apiGroup Review
 * @apiParam (Parameter) {Number}     star       Star of review
 * @apiParam (Parameter) {String}     reviewOfUser     Content of review
 *
 * @apiError (Response) {String} status      Status when complete
 * @apiError (Response) {String} message      Message when complete
 */
router.put("/:topicId", checkUserLoggedIn, reviewController.updateReview);

/**
 * @api {delte}       /review/:topicId        4. Delete review
 * @apiGroup Review
 * 
 * @apiError (Response) {String} status      Status when complete
 * @apiError (Response) {String} message      Message when complete
 */
router.delete("/:topicId", checkUserLoggedIn, reviewController.deleteReview);

module.exports = router;