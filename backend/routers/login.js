const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const Contact = require('../models/contact');
const PreviousCompany = require('../models/previousCompany');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    try{
        if(!user) {
            return res.status(404).send();
        }
        const passwordMatched = await bcrypt.compare(req.body.password, user.password);
        if(!passwordMatched) {
            return res.status(404).send();
        }
        const token = jwt.sign({
            email: user.email,
            id: user._id
        }, 
        'secret_this_should_be_longer', { expiresIn: '1h'});
        res.status(200).json({
            token: token,
            expiresIn: 3600,
        });
    }
    catch (e) {
        res.status(400).send(e);
    }
});

router.post('/create', async(req, res) => {
    let companyId = [];
    const companyReqBody = [...req.body.previousCompanies ];
    const prevCompany  = await PreviousCompany.create(companyReqBody);
    if(prevCompany) {
        companyId = prevCompany.map(company => company._id);
    }
    const { name, empid, company} = req.body;
    const contact = new Contact({ name, empid, company, previousCompanies: (companyId)});

    try {
        // await Contact.create({
        //     name: name,
        //     empid: empid,
        //     company: company,
        //     previousCompanies: [prevCompany[0]._id, prevCompany[1]._id]
        // });
        await contact.save();

        // employee.previousCompanies = (companyReqBody);

        res.status(201).json({
            id: req.body.empid,
        });
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.put('/update/:id', async(req,res) => {
    const updates = Object.keys(req.body).filter(key => key !== 'previousCompanies');
    const id = req.params.id;
    

    try {
        const previousCompanies = (req.body.previousCompanies);
        const contact = await Contact.findById(id).populate('previousCompanies');
        if(contact.previousCompanies.length == 0) {
            const prevCompany  = await PreviousCompany.create(previousCompanies);
            contact['previousCompanies'] = prevCompany;
        }
        else {
            previousCompanies.map(async (prevCompany, index) => {
                await PreviousCompany.updateOne({ companyName: contact.previousCompanies[index].companyName } , prevCompany );
            });
        }
        
        updates.forEach((update) => {
            contact[update] = req.body[update]
        });

        await contact.save();

        res.status(200).json({
            contact: contact
        });
    }
    catch(e) {
        res.status(400).send(e);
    }
    
});

module.exports = router;