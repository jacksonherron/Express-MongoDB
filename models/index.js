const mongoose = require('mongoose');
const PORT = 27017;
const DB_URL = `mongodb://localhost:${PORT}/express-cities`;

// mongoose.connect('database URL', 'options object')
// This is a promise...
// .then() listens for a resovle
// .catch() listens for an error
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log(`MongoDB connected on port ${PORT}`))
    .catch(error => console.log(error));

module.exports = {
    City: require('./City')
}