const mongoose = require('mongoose')

const alfredUserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        max: 20,
        requried: true
    },
    email: {
        type: String,
        max: 20,
        requried: true
    },
    password: {
        type: String,
        min: 6,
        requried: true
    },
    phoneNumber: {
        type: Number,
        min: 10,
        max: 10,
        requried: true
    },
    city: {
        type: String,
        max: 20,
        default: ""
    },
    address: {
        type: String,
        max: 150,
        default: ""
    },
    services: {
        type: Array,
        default: []
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', alfredUserSchema)