const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserCompanySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        required: true
    },
    favorited: {
        type: Boolean,
        required: true
    },
    earned_points: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const UserCompany = mongoose.model('user-company', UserCompanySchema);
module.exports = UserCompany;