var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose  = require("passport-local-mongoose");

var WorkSchema = new mongoose.Schema({
   date : String,
   workoutname : String,
   workouttype : String,
   trainer : String,
   preworkout : String,
   postworkout : String,
   exercise : String,
   reps : Number,
   sets : Number,
   rest : Number
});

module.exports = mongoose.model("Work",WorkSchema);