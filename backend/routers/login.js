const express = require('express');
const router = new express.Router();
const User = require('../models/user');
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

module.exports = router;