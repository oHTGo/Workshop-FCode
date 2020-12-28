//Init express & router
const express = require("express");
const router = express.Router();

const middleware = require("../middleware");

const topicController = require("../controllers/topic");

/**
 * @api {get}             /topic/schedule                      1.   Get an accepted list topic for schedule
 * @apiGroup Topic
 * @apiSuccess (Success) {String}       status                 Status of request
 * @apiSuccess (Success) {Object[]}     message                Array of object request
 * @apiSuccess (Success) {String}       object._id             ID of topic
 * @apiSuccess (Success) {String}       object.name            Name of topic
 * @apiSuccess (Success) {Date}         object.date            Date start of topic
 *
 * @apiError   (Error)   {String}       status                 Status when complete
 * @apiError   (Error)   {String}       message                Message when complete
 */
router.get("/schedule", middleware.checkUserLoggedIn, topicController.getListTopicForSchedule);

/**
 * @api {get}             /topic/ranking                       2.  Get ranking of list topic
 * @apiGroup Topic
 * @apiSuccess (Success) {String}       status                 Status of request
 * @apiSuccess (Success) {Object[]}     message                Array of object request
 * @apiSuccess (Success) {String}       object._id             ID of topic
 * @apiSuccess (Success) {String}       object.name            Name of topic
 * @apiSuccess (Success) {Number}       object.averageRate     Average rate of topic
 *
 * @apiError   (Error)   {String}       status                 Status when complete
 * @apiError   (Error)   {String}       message                Message when complete
 */
router.get("/ranking", middleware.checkUserLoggedIn, topicController.getRanking);

/**
 * @api {get}             /topic                               3.1  Get count page topic
 * @apiGroup Topic
 * @apiSuccess (Success) {String}       status                 Status of request
 * @apiSuccess (Success) {Object[]}     message                Array of object request
 * @apiSuccess (Success) {Number}       object.countPage       The number of pages
 *
 * @apiError   (Error)   {String}       status                 Status when complete
 * @apiError   (Error)   {String}       message                Message when complete
 */
router.get("/", middleware.checkUserLoggedIn, topicController.getCountPageTopic);

/**
 * @api {get}             /topic/page/:numberPage                       3.2  Get an accepted list topic at number page
 * @apiGroup Topic
 * @apiSuccess (Success) {String}       status                          Status of request
 * @apiSuccess (Success) {Object[]}     message                         Array of object request
 * @apiSuccess (Success) {String}       object._id                      ID of topic
 * @apiSuccess (Success) {String}       object.name                     Name of topic
 * @apiSuccess (Success) {String}       object.detail                   Detail of topic
 * @apiSuccess (Success) {String}       object.background               URL background of topic
 * @apiSuccess (Success) {Date}         object.date                     Date start of topic
 * @apiSuccess (Success) {Number}       object.averageRate              Average rate of topic
 * @apiSuccess (Success) {Number}       object.participantsCount        Number of participants
 *
 * @apiError   (Error)   {String}       status                 Status when complete
 * @apiError   (Error)   {String}       message                Message when complete
 */
router.get("/page/:numberPage", middleware.checkUserLoggedIn, topicController.getListTopic);

/**
 * @api {post}            /topic                            3.3 Create topic
 * @apiGroup Topic
 * @apiParam (Parameter) {String}     name                  Name of topic
 * @apiParam (Parameter) {String}     detail                Detail of topic
 * @apiParam (Parameter) {String}     note                  Note of topic
 * @apiParam (Parameter) {String}     background            URL background of topic
 * @apiParam (Parameter) {Date}       date                  Date start of topic
 * @apiParam (Parameter) {Array}      group                 Array userID is members
 *
 * @apiError (Response)  {String}     status                Status when complete
 * @apiError (Response)  {String}     message               Message when complete
 */
router.post("/", middleware.checkUserLoggedIn, topicController.createTopic);

/**
 * @api {get}            /topic/:topicId                           3.4 Get topic
 * @apiGroup Topic
 * @apiSuccess (Success) {String}     status                       Status of request
 * @apiSuccess (Success) {Object}     message                      Array of object request
 * @apiSuccess (Success) {String}     object._id                   ID of topic
 * @apiSuccess (Success) {String}     object.name                  Name of topic
 * @apiSuccess (Success) {String}     object.detail                Detail of topic
 * @apiSuccess (Success) {String}     object.note                  Note of topic
 * @apiSuccess (Success) {String}     object.background            URL background of topic
 * @apiSuccess (Success) {Date}       object.date                  Date start of topic
 * @apiSuccess (Success) {Object[]}   object.group                 List members of group topic
 * @apiSuccess (Success) {String}     object.group._id             ID of member's topic
 * @apiSuccess (Success) {String}     object.group.name            Name of member's topic
 * @apiSuccess (Success) {Object[]}   object.participants          List participants of topic
 * @apiSuccess (Success) {String}     object.participants._id      ID of participants's topic
 * @apiSuccess (Success) {String}     object.participants.name     Name of participants's topic
 * @apiSuccess (Success) {Object}     object.author                Information of author
 * @apiSuccess (Success) {String}     object.author._id            ID of author's topic
 * @apiSuccess (Success) {String}     object.author.name           Name of author's topic
 * @apiSuccess (Success) {Object[]}   object.review                Review of members
 * @apiSuccess (Success) {String}     object.review.content        Content of review
 * @apiSuccess (Success) {Number}     object.review.star           Star of review
 *
 * @apiError   (Error)   {String}     status                       Status when complete
 * @apiError   (Error)   {String}     message                      Message when complete
 */
router.get("/:topicId", middleware.checkUserLoggedIn, topicController.getTopic);

/**
 * @api {put}             /topic/:topicId                   3.5 Update topic
 * @apiGroup Topic
 * @apiParam (Parameter) {String}     name                  Name of topic
 * @apiParam (Parameter) {String}     detail                Detail of topic
 * @apiParam (Parameter) {String}     note                  Note of topic
 * @apiParam (Parameter) {String}     background            URL background of topic
 * @apiParam (Parameter) {Date}       date                  Date start of topic
 * @apiParam (Parameter) {Array}      group                 Array userID is members
 *
 * @apiError (Response)  {String}     status                Status when complete
 * @apiError (Response)  {String}     message               Message when complete
 */
router.put("/:topicId", middleware.checkUserLoggedIn, topicController.updateTopic);

/**
 * @api {delete}         /topic/:topicId            3.6 Delete topic
 * @apiGroup Topic
 * 
 * @apiError (Response) {String}    status          Status when complete
 * @apiError (Response) {String}    message         Message when complete
 */
router.delete("/:topicId", middleware.checkUserLoggedIn, topicController.deleteTopic);

/**
 * @api {get}             /topic/:topicId/join                      4.1  Get status of participant's topic
 * @apiGroup Topic
 * @apiSuccess (Success) {String}     status                        Status of request
 * @apiSuccess (Success) {Object}     message                       Object request
 * @apiSuccess (Success) {Boolean}    object.statusParticipant      Status of participant's topic
 *
 * @apiError (Error)    {String}      status                        Status when complete
 * @apiError (Error)    {String}      message                       Message when complete
 */
router.get("/:topicId/join", middleware.checkUserLoggedIn, topicController.checkStatusParticipant);

/**
 * @api {post}            /topic/:topicId/join                      4.2  Join topic
 * @apiGroup Topic
 * @apiSuccess (Success) {String}     status                        Status of request
 * @apiSuccess (Success) {String}     message                       Message of request
 *
 * @apiError (Error) {String}         status                        Status when complete
 * @apiError (Error) {String}         message                       Message when complete
 */
router.post("/:topicId/join", middleware.checkUserLoggedIn, topicController.joinTopic);

module.exports = router;