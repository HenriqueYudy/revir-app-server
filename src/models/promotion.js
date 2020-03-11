const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    promotion_point: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "company"
    },
    message: { 
        type: String,
        required: false
    }

});

const Promotion = mongoose.model('promotion', PromotionSchema);
module.exports = Promotion;