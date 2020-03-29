const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MenuSchema = new Schema({
    nameOfMenu: {
        type: String,
        required: true
    },
    data: [{
        number: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        yield: {
            type: String,
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
    }
});

module.exports = Menu = mongoose.model('Menu', MenuSchema);