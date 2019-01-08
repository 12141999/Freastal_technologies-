var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose  = require("passport-local-mongoose");

var TrainerdocumentSchema = new mongoose.Schema({
   file : String
});

module.exports = mongoose.model("Trainerdocument",TrainerdocumentSchema);