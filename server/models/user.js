const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let password = 'indeed';

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


UserSchema.methods.removeToken = function (token) {
	let user = this;

	return user.update({
		$pull: {
			tokens: { token }
		}
	});
};


// using .statics creates model methods, not instance methods
UserSchema.statics.findByToken = function (token) {
	let User = this;
	let decoded;

	try {
		decoded = jwt.verify(token, 'indeed');
	} catch (e) {
		return Promise.reject();
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

UserSchema.statics.findByCredentials = function (email, password) { // using regular fn because we need access to the this binding
	let User = this;

	return User.findOne({email}).then((user) => {
					if (!user) {
						return Promise.reject();
					}

					return new Promise((resolve, reject) => {
						bcrypt.compare(password, user.password, (err, res) => {
							if (res) {
								resolve(user);
							} else {
								reject();
							}
						});
					});
				});
};

UserSchema.pre('save', function (next) {
	let user = this;

	if (user.isModified('password')) {

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash; // set the user.password value to the hashed response
				next(); // complete middleware
			});
		});

	} else {
		next();
	}

});

let User = mongoose.model('User', UserSchema);

module.exports = {
	User
};