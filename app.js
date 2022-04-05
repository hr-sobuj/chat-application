const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { urlencoded } = require('express');

const app = express();
dotenv.config();

// DATABASE CONNECTION
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Database Connected.'))
    .catch((err) => {
        console.log(err);
    });

// PARSER
app.use(express.json());
app.use(urlencoded({ extended: true }));

// set engine
app.set('view engine', 'ejs');

// set static files
app.use(express.static(path.join(__dirname, 'public')));

// routing setup

// error handling

// listing
app.listen(process.env.PORT, () => {
    console.log(`app is listening on the port ${process.env.PORT}`);
});
