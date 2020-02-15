const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    key: {
        type: String,
        unique: true,
    },
    active: {
        type: Boolean,
        required: true,
    }
});

const UserProduct = mongoose.model('user_product', UserProductSchema);
module.exports = UserProduct;