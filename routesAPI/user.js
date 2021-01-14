//Init express & router
const express = require("express");
const router = express.Router();

const middleware = require("../middleware");
const userController = require("../controllers/user");

/**
 * @api {get}             /user                         1. Get list of user information
 * @apiGroup User
 * @apiSuccess (Success) {String}     status            Status of request
 * @apiSuccess (Success) {Object[]}   message           Array of object request
 * @apiSuccess (Success) {String}     object._id        ID of user
 * @apiSuccess (Success) {String}     object.name       Name of user
 *
 * @apiError   (Error)   {String}     status            Status when complete
 * @apiError   (Error)   {String}     message           Message when complete
 */
router.get("/", middleware.checkUserLoggedIn, userController.getListUser);


/**
 * @api {get}             /user/current                 2. Get current user information
 * @apiGroup User
 * @apiSuccess (Success) {String}     status            Status of request
 * @apiSuccess (Success) {Object}     message           Object request
 * @apiSuccess (Success) {String}     object._id        ID of user
 * @apiSuccess (Success) {String}     object.name       Name of user
 * @apiSuccess (Success) {Boolean}    object.isAdmin    Access of user
 *
 * @apiError   (Error)   {String}     status            Status when complete
 * @apiError   (Error)   {String}     message           Message when complete
 */
router.get("/current", middleware.checkUserLoggedIn, userController.getCurrentUser);

/**
 * @api {get}            /user/topic                        3. Get list topic of current user or list all topic (if is admin)
 * @apiGroup User
 * @apiSuccess (Success) {String}     status                Status of request
 * @apiSuccess (Success) {Object[]}   message               Array of object request
 * @apiSuccess (Success) {String}     object._id            ID of topic
 * @apiSuccess (Success) {String}     object.name           Name of topic
 * @apiSuccess (Success) {Date}       object.date           Date of topic
 * @apiSuccess (Success) {Object}     object.author         Information of author
 * @apiSuccess (Success) {String}     object.author._id     ID of author's topic
 * @apiSuccess (Success) {String}     object.author.name    Name of author's topic
 * @apiSuccess (Success) {Boolean}    object.status         Status of topic (0: waiting, 1: accept: -1: reject)
 *
 * @apiError   (Error)   {String}     status                Status when complete
 * @apiError   (Error)   {String}     message               Message when complete
 */
router.get("/topic", middleware.checkUserLoggedIn, userController.getListTopicOfUser);

/**
 * @api {post}            /user/topic/:topicId       4. Set status topic (require is admin)
 * @apiGroup User
 * @apiParam (Parameter) {String}    action         Status of topic ("accept" or "reject")
 *
 * @apiError (Error)     {String}    status         Status when complete
 * @apiError (Error)     {String}    message        Message when complete
 */
router.post("/topic/:topicId", middleware.checkUserLoggedIn, middleware.checkAdmin, userController.censoreTopic);

module.exports = router;