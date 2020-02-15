const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const CompanySchema = new Schema({
    cnpj: {
        type: String,
        required: true,
        unique: true
    },
    fantasy_name: {
        type: String,
        required: true,
        unique: true
    },
    cell_phone: {
        type: String,
        required: true,
    },
    tel_number: {
        type: String,
        required: true,    
    },
    tel_number2: {
        type: String,
        required: true,    
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    neighborhood: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    },
    employee: [{
        type: Schema.Types.ObjectId,
        ref: 'employee',
        required: false,
    }],
    location: {
        latitude: Number,
        longitude: Number
    },
    active: Boolean,
    logo: String,
    point_value: {
        type: Number,
        required: true
    }
});

CompanySchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const Company = mongoose.model('company', CompanySchema);
module.exports = Company;