const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const topicSchema = Schema({
  name: {
    type: String,
    required: true
  },
  detail: String,
  note: String,
  group: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  date: Schema.Types.Date,
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  review: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });


module.exports = mongoose.model('Topic', topicSchema);