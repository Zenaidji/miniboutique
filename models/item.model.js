const mongoose = require('mongoose');
// definition of schema for Items
const ItemSchema = new mongoose.Schema({
    discription: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
    },

    userId: mongoose.ObjectId
});



module.exports = ItemSchema;