const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the db', () => {
	var joe, maria, alex, zach;

	beforeEach((done) => {
		alex = new User({ name: 'Alex' });
		joe = new User({ name: 'Joe' });
		maria = new User({ name: 'Maria' });
		zach = new User({ name: 'Zach' });

		Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
			.then(() => {
				done();
			});
	});
	
	it('finds all users with a name of joe', (done) => {
		User.find({
			name: 'Joe'
		}).then((users) => {
			assert(users[0]._id.toString() === joe._id.toString());
			done();
		});
	});

	it('finds all users with a particular id', (done) => {
		User.findOne({
			_id: joe._id
		}).then((user) => {
			assert(user.name === 'Joe');
			assert(user._id.toString() === joe._id.toString()); // call toString() on the userId to compare it
			done();
		});
	});

	it('can skip and limit the result set', (done) => {
		User.find({}) // get all
			.skip(1) // skip this # of records
			.limit(2) // only return up to this limit
			.sort({ name: 1 }) // 1 = asc, -1 = desc
			.then((users) => {
				assert(users[0].name === 'Joe');
				assert(users[1].name === 'Maria');
				assert(users.length === 2);
				done();
			});
	})
});