var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose  = require("passport-local-mongoose");

var DietSchema = new mongoose.Schema({
   date : String,
   dietplanname : String,
   dietplantype : String,
   item : String,
   quantity : Number,
   time : String,
   specification : String
});

module.exports = mongoose.model("Diet",DietSchema);