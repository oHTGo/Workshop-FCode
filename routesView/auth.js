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
router.get("/auth/google", passport.authenticate("google", { scope: ['profile', 'email'], accessType: 'offline', prompt: 'consent' }));
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: '/failed' }), (req, res) => {
    res.redirect(process.env.REDIRECT_LOGIN);
});

module.exports = router;