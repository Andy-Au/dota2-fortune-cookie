var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KillSchema = new Schema({
	message: String,
	level: Number,
	random: Number
});

mongoose.model('kills', KillSchema);