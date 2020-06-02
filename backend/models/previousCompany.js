const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: false,
    },
    experience: {
        type: Number,
        required: false,
    },
});

const PreviousCompany = mongoose.model('PreviousCompany', companySchema);

module.exports = PreviousCompany;