const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRouter = require('./routers/contact');
const userRouter = require('./routers/login');
const bodyParser = require('body-parser');
const path = require('path');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
});

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
// });
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(contactRouter);

console.log(express.static(__dirname));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/users', userRouter);


app.listen(port, () => {
    console.log("Server is up on port " + port);
});



