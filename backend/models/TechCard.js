const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TechCardSchema = new Schema({
    data: [{
        number: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        bruto: {
            type: Number,
            required: true
        },
        neto: {
            type: Number,
            required: true
        },
        b: {
            type: Number,
            required: true
        },
        r: {
            type: Number,
            required: true
        },
        a: {
            type: Number,
            required: true
        },
        kcal: {
            type: Number,
            required: true
        }
    }]
});

module.exports = TechCard = mongoose.model('TechCard', TechCardSchema);