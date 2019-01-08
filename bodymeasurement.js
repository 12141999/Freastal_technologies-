var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose  = require("passport-local-mongoose");

var BodySchema = new mongoose.Schema({
   date : String,
   height : Number,
   weight : Number,
   neck : Number,
   shoulder : Number,
   chestextended : Number,
   chestnormal : Number,
   forearms : Number,
   biceps : Number,
   wrist : Number,
   upperabs : Number,
   lowerabs : Number,
   waist : Number,
   hips : Number,
   thigh : Number,
   calves : Number,
   ankles : Number
});

module.exports = mongoose.model("Body",BodySchema);