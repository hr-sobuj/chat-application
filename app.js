// external import
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { urlencoded } = require('express');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const socket = require('socket.io');

// internal import
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const loginRouter = require('./route/loginRouter');
const usersRouter = require('./route/usersRouter');
const inboxRouter = require('./route/inboxRouter');

const app = express();
dotenv.config();

// set comment as app locals
app.locals.moment = moment;

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

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

// 404 not found handling
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

// listing
// app.listen(process.env.PORT, () => {
//     console.log(`app is listening on the port ${process.env.PORT}`);
// });

const server = app.listen(process.env.PORT, () => {
    console.log(`app is listening on the port http://localhost:${process.env.PORT}`);
});

const io = socket(server);
io.on('connection', (socket) => {
    console.log(`${socket.id} is connected`);
});

global.io = io;
