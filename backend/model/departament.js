const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DepartamentSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
    }
  }
);

module.exports = mongoose.model("Departament", DepartamentSchema);