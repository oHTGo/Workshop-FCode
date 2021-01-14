const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    refreshToken: String
});


module.exports = mongoose.model('User', userSchema);