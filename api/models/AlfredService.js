const mongoose = require('mongoose')

const alfredServiceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serviceName: {
        type: String,
        max: 100,
        required: true
    },
    ratings: {
        type: String,
        min: 1,
        max: 5,
        required: true
    },
    bookings: {
        type: String,
        default: ""
    },
    price: {
        type: String,
        default: ""
    },
    technician: {
        type: Array,
        default: []
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Service', alfredServiceSchema);