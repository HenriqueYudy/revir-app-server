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
    nickname: String,
    cash_back_points: Number,
    birth_date: Date,
    cell_phone: String,
    active: Boolean
 }]);

 userSchema.pre('save', async function (next) {
     const hash = await bcrypt.hash(this.password, 10);
     this.password = hash;

     next();
 });

 const User = mongoose.model('user', userSchema);
 module.exports = User;