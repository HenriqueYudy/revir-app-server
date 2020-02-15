const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const EmployeeSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,  
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    active: Boolean
});

EmployeeSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;