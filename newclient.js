var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose  = require("passport-local-mongoose");

var ClientSchema = new mongoose.Schema({
   invoiceno : Number,
   profile : String,
   membershipid : String,
   clientname : String,
   contactno : Number,
   alternatecontactno : Number,
   gender : String,
   address : String,
   profession : String,
   email : String,
   marriageanniversary : Date,
   dob : Date,
   clientsource : String,
   dateofbill : Date,
   dateofjoining : Date,
   packages : String,
   duration : Number,
   packagefees : Number,
   packageenddate : Date,
   discount : Number,
   tax : String,
   amountpayable : Number,
   amountpaid : Number,
   paymentmethod : String,
   pendingamount : String,
   trainer : String,
   remarks : String
});

module.exports = mongoose.model("Client",ClientSchema);