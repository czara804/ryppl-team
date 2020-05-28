const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Drop = new Schema ({
  username: {
    type: String,
    required: [true, "Must have a username"],
    minlength: [5, "Must be longer than 5 characters"]
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    required: true
  },
  modified_date: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model("drop", Drop)

