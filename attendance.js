var mongoose = require("mongoose");

var AttendanceSchema = new mongoose.Schema({
 
clientid : String,
clientname : String,
flag : String,
date : Date

});

module.exports = mongoose.model("Attendance" , AttendanceSchema);