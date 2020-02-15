const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    required_point: {
        type: Number,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "company"
    },
    active: {
        type: Boolean,
        required: true
    },
    picture: {
        type: String,
        required: false
    }
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;