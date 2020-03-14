const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPromoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    promo_product: {
        type: Schema.Types.ObjectId,
        ref: "promotion",
        required: true
    },
    key: {
        type: String,
        unique: true,
    },
    active: {
        type: Boolean,
        required: true
    }
});

const UserPromo = mongoose.model('user_promo', UserPromoSchema);
module.exports = UserPromo;