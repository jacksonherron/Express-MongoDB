// We're creating a schema for a city
// This is a model of what future cities should look like
// Model files are capitalized by default

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: String,
    description: String,
});

// mongoose.model('collection name', 'Schema')
const City = mongoose.model('City', citySchema);

module.exports = City;