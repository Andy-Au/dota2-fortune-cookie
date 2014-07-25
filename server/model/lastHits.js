var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LastHitSchema = new Schema({
	message: String,
	level: Number,
	random: Number
});

mongoose.model('lasthits', LastHitSchema);