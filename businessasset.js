var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose  = require("passport-local-mongoose");

var AssetSchema = new mongoose.Schema({
   assetname : String,
   description : String,
   dateofpurchase : String,
   warrantyexpiredate : String,
   nextservice : String,
   latestservice : String,
   repairdescription : String
});

module.exports = mongoose.model("Asset",AssetSchema);