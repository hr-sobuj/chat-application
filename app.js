// external import
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { urlencoded } = require('express');

// internal import
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const loginRouter = require('./route/loginRouter');

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
app.use('/', loginRouter);
// app.use('/user', userRouter);
// app.use('/inbox', inboxRouter);

// 404 not found handling
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

// listing
app.listen(process.env.PORT, () => {
    console.log(`app is listening on the port ${process.env.PORT}`);
});
