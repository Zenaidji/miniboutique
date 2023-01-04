const mongoose = require('mongoose');
const ObjectSchema = new mongoose.Schema({
    name: String,
    price: { type: Number, min: 0 },
    ownerId: { type: String, default: "" }
});
module.exports = ObjectSchema;
const dbConnection = require('../controllers/db.controllers');
const objects = dbConnection.model('objectsBd', ObjectSchema, 'objects');
module.exports.model = objects;