var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose  = require("passport-local-mongoose");

var DocumentSchema = new mongoose.Schema({
   clientid : String,
   documentname : String,
   file : String
});

module.exports = mongoose.model("Document",DocumentSchema);