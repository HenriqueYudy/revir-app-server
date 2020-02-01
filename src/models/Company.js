const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    cnpj: String,
    fantasy_name: String,
    cell_phone: String,
    tel_number: String,
    tel_number2: String,
    password: String,
    email: String,
    address: String,
    neighborhood: String,
    city: String,
    uf: String,
    employee: [{
        type: Schema.Types.ObjectId,
        ref: 'employee'
    }],
    location: {
        latitude: Number,
        longitude: Number
    },
    active: Boolean,
    logo: String
});

const Company = mongoose.model('company', CompanySchema);
module.exports = Company;