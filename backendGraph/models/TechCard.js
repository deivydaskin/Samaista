const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TechCardSchema = new Schema({
    recipeNumber: {
        type: String,
        required: true
    },
    nameOfCard: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    data: [{
        number: {
            type: Number,
            required: true
        },
        code: {
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
    }],
    overallB: {
        type: Number,
        required: true
    },
    overallR: {
        type: Number,
        required: true
    },
    overallA: {
        type: Number,
        required: true
    },
    overallKcal: {
        type: Number,
        required: true
    },
    yield: {
        type: String,
        required: true
    }
});

module.exports = TechCard = mongoose.model('TechCard', TechCardSchema);