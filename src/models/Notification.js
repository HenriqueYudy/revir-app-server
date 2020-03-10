const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
        required: true
    },
    active:{
        type: Boolean,
        required: true
    },
    message: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
   
});

const Notification = mongoose.model('notification', NotificationSchema);
module.exports = Notification;