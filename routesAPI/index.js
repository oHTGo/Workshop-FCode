//Init express & router
const express = require("express");
const router = express.Router();

//Init Hepler
const helper = require("../helper");

router.use("/topic", require("./topic"));
router.use("/review", require("./review"));
router.use("/user", require("./user"));

// 404 error.
router.use(function (req, res, next) {
    helper.setStatusNotFound(res, "Path or method does not exist");
    return;
});


module.exports = router;