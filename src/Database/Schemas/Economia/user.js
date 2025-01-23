const { mongoose, Schema } = require('mongoose');

const userSchema = new Schema({
		_id: { 
				type: String
		},
		maxiums: { 
				type: Number, default: 0
		},
		maxiums_bank: {
				type: Number, default: 0
		},
		bank: {
			type: Boolean, default: false
	},
		bank_type: {
				type: String, default: 'Nenhum'
		},
		bank_img: {
			type: String  
		},
		daily: { 
				type: Number, default: 0
		},
		cooldownc: {
				type: Number, default: 0
		},
		nickname: {
				type: String, default: 'Nenhum'
		},
		desc: {
				type: String, default: 'Amigo do Max!'
		},
});

module.exports = mongoose.model('User', userSchema);