const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    code: {
        type: Number,
        required: true
    },
    nameOfProduct: {
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
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = Product = mongoose.model('Product', ProductSchema);