let mongoose = require('mongoose');

mongoose.Promise = global.Promise; // configure promises
mongoose.connect('mongodb://localhost:27017/TodoApp'); // connect to db

module.exports = {
	mongoose
};