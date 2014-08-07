var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KillDetailSchema = new Schema({
	message: String,
	level: Number,
	random: Number
});

mongoose.model('killdetails', KillDetailSchema);