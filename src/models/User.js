const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema([{
    name: String,
    password: {
        type: String,
        required: true,
        select: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
        required: true,
    },
    cash_back_points: {
        type: Number,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    cell_phone: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
 }]);

 userSchema.pre('save', async function (next) {
     const hash = await bcrypt.hash(this.password, 10);
     this.password = hash;

     next();
 });

 const User = mongoose.model('user', userSchema);
 module.exports = User;