const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransitionSchema = new Schema({
  description: {
    type: String,
    required: true,
    maxlength: 500
    },
    user: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },

  }
);

module.exports = mongoose.model("Transition", TransitionSchema);