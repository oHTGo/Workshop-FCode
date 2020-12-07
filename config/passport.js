const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//Init User model
const User = require("../models/User");

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

const configPassport = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            // console.log(refreshToken);
            if (profile.id) {
                User.findOne({ googleId: profile.id })
                    .then((user) => {
                        if (user) {
                            done(null, user);
                        } else {
                            const newUser = new User({
                                googleId: profile.id,
                                name: profile.displayName,
                                refreshToken: refreshToken
                            });
                            newUser.save()
                                .then(user => {
                                    done(null, user);
                                });
                        }
                    })
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, {refreshToken: 0})
            .then(user => {
                done(null, user);
            })
    });
}
module.exports = configPassport;