//Init express & router
const express = require("express");
const router = express.Router();

//Init Hepler
const helper = require("../helper");

const User = require("../models/User");

const checkUserLoggedIn = require("../middleware");

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
router.get("/", checkUserLoggedIn, async (req, res) => {
    const userData = await User.find({}, { isAdmin: 0, googleId: 0, refreshToken: 0 });

    if (userData) {
        helper.setStatusSuccess(res, userData);
    } else {
        helper.setStatusFailure(res, "Error from server");
    }
});

module.exports = router;