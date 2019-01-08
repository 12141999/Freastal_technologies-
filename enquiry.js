var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose  = require("passport-local-mongoose");

var EnquirySchema = new mongoose.Schema({
   clientname : String,
   contactno : Number,
   altcontactno : Number,
   enquiryfor : String,
   nextfollowup : String,
   trialdate : String,
   followuptime : String,
   type : String,
   status : String,
   response : String,
   attendedby : String,
   source : String
});

module.exports = mongoose.model("Enquiry",EnquirySchema);