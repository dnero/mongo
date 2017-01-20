let mongoose = require('mongoose');

mongoose.Promise = global.Promise; // configure promises
mongoose.connect(process.env.MONGODB_URI); // connect to db

module.exports = {
	mongoose
};