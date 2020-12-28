//Init express & router
const express = require("express");
const router = express.Router();

const middleware = require("../middleware");
const reviewController = require("../controllers/review");

/**
 * @api {get}                /review/:topicId                  1.  Get review
 * @apiGroup Review
 * @apiSuccess (Success)    {String}     status                Status of request
 * @apiSuccess (Success)    {Object}     message               Object request
 * @apiSuccess (Success)    {String}     object._id            ID of review
 * @apiSuccess (Success)    {Number}     object.star           Star of review
 * @apiSuccess (Success)    {String}     object.content        Content of review
 *
 * @apiError   (Error)      {String}     status                Status when complete
 * @apiError   (Error)      {String}     message               Message when complete
 */
router.get("/:topicId", middleware.checkUserLoggedIn, reviewController.getReview);


/**
 * @api {post}               /review/:topicId                          2. Create review
 * @apiGroup Review
 * @apiParam (Parameter)    {Number{1-5}}      star                    Star of review
 * @apiParam (Parameter)    {String}           content                 Content of review
 *
 * @apiError (Response)     {String}           status                  Status when complete
 * @apiError (Response)     {String}           message                 Message when complete
 */
router.post("/:topicId", middleware.checkUserLoggedIn, reviewController.createReview);

/**
 * @api {put}                /review/:topicId                        3. Update review
 * @apiGroup Review
 * @apiParam (Parameter)    {Number{1-5}}       star                 Star of review
 * @apiParam (Parameter)    {String}            content              Content of review
 *
 * @apiError (Response)     {String}            status               Status when complete
 * @apiError (Response)     {String}            message              Message when complete
 */
router.put("/:topicId", middleware.checkUserLoggedIn, reviewController.updateReview);

/**
 * @api {delete}          /review/:topicId            4. Delete review
 * @apiGroup Review
 * 
 * @apiError (Response) {String}        status       Status when complete
 * @apiError (Response) {String}        message      Message when complete
 */
router.delete("/:topicId", middleware.checkUserLoggedIn, reviewController.deleteReview);

module.exports = router;