var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose  = require("passport-local-mongoose");

var AddpackageSchema = new mongoose.Schema({
   clientname : String,
   packagename : String,
   duration : Number,
   packagefees : Number,
   status : String
});

module.exports = mongoose.model("Addpackage",AddpackageSchema);