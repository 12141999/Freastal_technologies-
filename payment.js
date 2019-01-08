var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose  = require("passport-local-mongoose");

var PaymentSchema = new mongoose.Schema({
   invoiceno : Number,
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
   remarks : String,
   amount : Number,
   date : String,
   status : String,
   paymentmethods : String
});

module.exports = mongoose.model("Payment",PaymentSchema);