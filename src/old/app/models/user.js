// get an instance of mongoose and mongoose.Schema
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean,
    gast: Boolean,
    livingmate: Boolean,
    accessstart: { type: Date, default: Date.now },
    accessstop: { type: Date, default: Date.now }

}));
