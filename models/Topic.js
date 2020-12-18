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
  background: String,
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
  },
  status: {
    type: Number,
    default: 0,
    min: -1,
    max: 1
  }
}, { timestamps: true });


module.exports = mongoose.model('Topic', topicSchema);