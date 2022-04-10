// external import
const mongoose = require('mongoose');

// people schema
const peopleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            require: true,
        },
        avatar: {
            type: String,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
    },
    {
        timestamps: true,
        // eslint-disable-next-line prettier/prettier
    },
);

// people model
const People = mongoose.model('People', peopleSchema);

// export module
module.exports = People;
