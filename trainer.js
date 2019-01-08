var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose  = require("passport-local-mongoose");

var TrainerSchema = new mongoose.Schema({
	trainername : String,
	dob : String,
	comission : Number,
	password : String,
	contactno : Number,
	email : String,
	gender : String,
	salary : Number,
	confirmpassword : String,
	address : String,
	status : String
});

module.exports = mongoose.model("Trainer",TrainerSchema);