const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ActionSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
});

const Action = mongoose.model('action', ActionSchema);
module.exports = Action;