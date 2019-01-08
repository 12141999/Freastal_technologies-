var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose  = require("passport-local-mongoose");

var ExpenseSchema = new mongoose.Schema({
   date : String,
   expensetype : String,
   amountpaid : Number,
   modeofpayment : String,
   recipientname : String,
   description : String
});

module.exports = mongoose.model("Expense",ExpenseSchema);