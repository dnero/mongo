const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
	mongoose.connect('mongodb://localhost/users_test'); // specify the db to connect to
	mongoose.connection
		.once('open', () => {
			done();
		}) // only run this event once
		.on('error', (error) => { // run this event whenever an error event happens
			console.warn('Warning', error);
		});
});

beforeEach((done) => {
	const { users, comments, blogposts } = mongoose.connection.collections;
	users.drop(() => {
		comments.drop(() => {
			blogposts.drop(() => {
				done();
			});
		});
	});
});

