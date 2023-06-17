const { default: mongoose, model } = require("mongoose");
const { Schema } = mongoose;

const testsSchema = new Schema({
    key: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        // required: true
    },
    url: {
        type: String,
        // required: true
    },
    tests: {
        type: String,
        // required: true
    },
    time: {
        type: String,
        // required: true
    },
    desp: {
        type: String,
        // required: true
    }
})

const CareItemSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    testDesc: {
        type: String,
        required: true
    },
    mainImageURL: {
        type: String,
        required: true
    },
    fullImageURL: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    offerPrice: {
        type: Number,
        required: true
    },
    noOfTests: {
        type: String,
        required: true
    },
    reportTime: {
        type: String,
        required: true
    },
    testsInclude: [testsSchema]
});

module.exports = mongoose.model('sculpt-care-items', CareItemSchema);