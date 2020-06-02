const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    empid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true
    },
    avatar: {
        type: Buffer,
    },
    filePath: {
        type: String,
    },
    previousCompanies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PreviousCompany"
    }],             
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;