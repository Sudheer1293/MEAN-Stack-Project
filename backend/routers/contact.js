const express = require('express');
const router = new express.Router();
const Contact = require('../models/contact');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

router.get('/summary', checkAuth, async (req, res) => {
    const pattern = new RegExp(`^${req.query.search}.*`);
    try{
        if(req.query.search != undefined) {
            contacts = await Contact.find({ name: { $regex: pattern, $options: 'i' }});
        }
        else {
            contacts = await Contact.find();
        }
        
        res.status(200).send(contacts); 
    }
    catch (e) {
        res.status(400).send(e);
    }
});

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};


const storage = multer.diskStorage({
    destination: 'backend/images',
    limits: {
        fileSize: 1000000,
    },
    filename(req, file, cb) {
        const filename = file.originalname;
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, filename + '-' + Date.now() + '.' + ext);
    },
    fileFilter(req, file, cb) {
        // console.log(file)
        if(!file.originalname.match(/\.(jpg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }

        cb(undefined, true);
    }
});

const upload = multer ({
    storage: storage,
});

router.post('/uploadFile', upload.single('avatar'), async (req, res) => {
    console.log(req.file);
    try {
        const contact = await Contact.findOne({ empid: req.body.empid });
        // contact.avatar = req.file.buffer;
        const host = req.hostname;
        const filePath = req.protocol + "://" + host + ':3000' + '/' + 'images/' + req.file.filename;
        contact.filePath = filePath;
        console.log(filePath)
        await contact.save();
        res.status(200).json({
            "message": "Uploaded successfully"
        })
    }
    catch (err) {
        res.status(400).json({
            "error": err.message
        })
    }
});


module.exports = router;