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
   
    identification_code: {
        type: Number,
        required: true,
        select: false
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    active: Boolean
});


const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;