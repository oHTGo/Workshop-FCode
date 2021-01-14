//Init express & router
const express = require("express");
const router = express.Router();

//Init Hepler
const helper = require("../helper");

const User = require("../models/User");

const checkUserLoggedIn = require("../middleware");

router.get("/", checkUserLoggedIn, async (req, res) => {
    const userData = await User.find({}, {isAdmin: 0, googleId: 0, refreshToken: 0});
    
    if (userData) {
        helper.setStatusSuccess(res, userData);
    } else {
        helper.setStatusFailure(res, "Error from server");
    }
});

module.exports = router;