var mongoose = require("mongoose");

var ResponseSchema = new mongoose.Schema({
   clientid : String,
   response : String
});

module.exports = mongoose.model("Response",ResponseSchema);