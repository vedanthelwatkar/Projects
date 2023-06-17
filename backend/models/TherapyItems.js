const { default: mongoose, model } = require("mongoose");
const { Schema } = mongoose;

const offerSchema = new Schema({
    key: {
        type: String,
        // required: true
    },
    offer: {
        type: String,
        // required: true
    }
})

const sessionSchema = new Schema({
    key: {
        type: String,
        // required: true
    },
    noSession: {
        type: Number,
        // required: true
    },
    noMonths: {
        type: Number,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    offer: {
        type: Number,
        // required: true
    },
    perSession: {
        type: Number,
        // required: true
    },
    desp: {
        type: String,
        // required: true
    }
})

const TherapyItemSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    therapyName: {
        type: String,
        required: true
    },
    therapyDesp: {
        type: String,
        required: true
    },
    firstImage: {
        type: String,
        required: true
    },
    therapyTime: {
        type: String,
        required: true
    },
    therapyPrice: {
        type: Number,
        required: true
    },
    offerPrice: {
        type: Number,
        required: true
    },
    therapyAbout: {
        type: String,
        required: true
    },
    secondImage: {
        type: String,
        required: true
    },
    therapyOffer: [offerSchema],
    therapySession: [sessionSchema]
});

module.exports = mongoose.model('sculpt-therapy-items', TherapyItemSchema);