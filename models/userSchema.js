const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    trainnumber: {
        type: String,
        required: true
    },
    traindate: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tickets: [ticketSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
