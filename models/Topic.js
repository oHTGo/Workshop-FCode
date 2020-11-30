const mongoose = require('mongoose');
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