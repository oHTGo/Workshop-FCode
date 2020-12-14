//Init express & router
const express = require("express");
const router = express.Router();

const checkUserLoggedIn = require("../middleware");
const userController = require("../controllers/user");

/**
 * @api {get}       /user        Get lists of user information
 * @apiGroup User
 * @apiSuccess (Success) {String}     status      Status of request
 * @apiSuccess (Success) {Object[]}   message   Array of object request
 * @apiSuccess (Success) {String}     object._id     ID of user
 * @apiSuccess (Success) {String}     object.name     Name of user
 *
 * @apiError (Error) {String} status      Status when complete
 * @apiError (Error) {String} message      Message when complete
 */
router.get("/", checkUserLoggedIn, userController.getListUser);


/**
 * @api {get}       /user/current     Get current user information
 * @apiGroup User
 * @apiSuccess (Success) {String}     status            Status of request
 * @apiSuccess (Success) {Object}     message           Object request
 * @apiSuccess (Success) {String}     object._id        ID of user
 * @apiSuccess (Success) {String}     object.name       Name of user
 *
 * @apiError (Error) {String} status      Status when complete
 * @apiError (Error) {String} message      Message when complete
 */
router.get("/current", checkUserLoggedIn, userController.getCurrentUser);

module.exports = router;