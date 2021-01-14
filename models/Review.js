const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    star: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    content: String,
    topic: {
        type: Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    }
}, { timestamps: true, versionKey: false });


module.exports = mongoose.model('Review', reviewSchema);