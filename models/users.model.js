const mongoose = require('mongoose');
// definition of schema for users
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        default: 2000,
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});



module.exports = UserSchema;
const dbConnection = require('../controllers/db.controllers.js');
const User = dbConnection.model('User', UserSchema, 'users');

module.exports.model = User;