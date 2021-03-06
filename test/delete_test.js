const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
	var joe;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		joe.save()
			.then(() => done());
	});

	it('model instance remove', (done) => {
		// remove a user by the exact model instance
		joe.remove()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('class method remove', (done) => {
		// remove a user by looking through the entire class
		User.remove({ name: 'Joe' })
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('class method findAndRemove', (done) => {
		User.findOneAndRemove({ name: 'Joe' })
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('class method findByIdAndRemove', (done) => {
		User.findByIdAndRemove(joe._id)
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});
});
