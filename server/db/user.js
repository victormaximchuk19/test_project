const { Schema, model } = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required:true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true }
})

module.exports = model('User', schema);