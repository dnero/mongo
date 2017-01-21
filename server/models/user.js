const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		required: true,
		minlength: 6,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		require: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});


// determines what gets sent back when a mongoose model is converted to JSON
UserSchema.methods.toJSON = function () {
	let user = this;
	let userObject = user.toObject(); // convert your mongoose var 'user' into a regular obj
	
	return _.pick(userObject, ['_id', 'email']);
};

// add a method to the UserSchema to generate the auth token
// not using an arrow fn because 'this' stores a ref to the individual user document
UserSchema.methods.generateAuthToken = function () {
	let user = this;
	let access = 'auth';
	let token = jwt.sign({_id: user._id.toHexString(), access}, 'indeed').toString();

	user.tokens.push({
		access,
		token
	});

	return user.save().then(() => {
		return token;
	});
};

let User = mongoose.model('User', UserSchema);

module.exports = {
	User
};