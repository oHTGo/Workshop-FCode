//Init express & router
const express = require("express");
const router = express.Router();

const passport = require("passport");

//Failed
router.get('/failed', (req, res) => {
    // console.log("ajshd");
    // helper.setStatusBadRequest(res, "Login in failed");
});

//Logout
router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

//Login Google
router.get("/auth/google", passport.authenticate("google", { scope: ['profile', 'email'], hd: "fpt.edu.vn", accessType: 'offline', prompt: 'consent' }));
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: '/failed' }), (req, res) => {
    if (process.env.NODE_ENV) {
        res.redirect("http://" + req.headers.host + process.env.REDIRECT_LOGIN);
    } else {
        res.redirect("https://" + req.headers.host + process.env.REDIRECT_LOGIN);
    }
});

module.exports = router;