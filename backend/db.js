const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/sculpt"

const connectToMongo = () => {
    // This is function to connect to mongoose. Connect function connect the mongoose to MongoDb thorugh the given URI. And if the connection is successfull, it returns a callback function and we can perform any operation to know that we have connected successfully(here we have performed console.log).
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;