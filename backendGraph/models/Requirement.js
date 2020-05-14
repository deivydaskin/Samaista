const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RequirementSchema = new Schema({
    nameOfProduct: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String
    }
});

module.exports = Requirement = mongoose.model('Requirement', RequirementSchema);