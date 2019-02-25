const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 200
    },
    departament:{
        type: Array,
        required: true
    }
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;