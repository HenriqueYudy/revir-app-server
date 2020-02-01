const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: String,
    email: String,
    password: String,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    active: Boolean
});

const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;