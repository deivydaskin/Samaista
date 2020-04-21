const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MenuSchema = new Schema({
    nameOfMenu: {
        type: String,
        required: true
    },
    breakfastData: [{
        recipeNumber: {
            type: String,
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
    breakfastOverallB: {
        type: Number,
        required: true
    },
    breakfastOverallR: {
        type: Number,
        required: true
    },
    breakfastOverallA: {
        type: Number,
        required: true
    },
    breakfastOverallKcal: {
        type: Number,
        required: true
    },
    lunchData: [{
        recipeNumber: {
            type: String,
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
    lunchOverallB: {
        type: Number,
        required: true
    },
    lunchOverallR: {
        type: Number,
        required: true
    },
    lunchOverallA: {
        type: Number,
        required: true
    },
    lunchOverallKcal: {
        type: Number,
        required: true
    },
    dinnerData: [{
        recipeNumber: {
            type: String,
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
    dinnerOverallB: {
        type: Number,
        required: true
    },
    dinnerOverallR: {
        type: Number,
        required: true
    },
    dinnerOverallA: {
        type: Number,
        required: true
    },
    dinnerOverallKcal: {
        type: Number,
        required: true
    }
});

module.exports = Menu = mongoose.model('Menu', MenuSchema);