var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose  = require("passport-local-mongoose");

var EmployeeSchema = new mongoose.Schema({
	employeename : String,
	dob : String,
	contactno : Number,
	email : String,
	gender : String,
	salary : Number,
	address : String,
	status : String
});

module.exports = mongoose.model("Employee",EmployeeSchema);