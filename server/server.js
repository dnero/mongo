const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // configure promises
mongoose.connect('mongodb://localhost:27017/TodoApp'); // connect to db

// let Todo = mongoose.model('Todo', {
// 	text: {
// 		type: String,
// 		required: true,
// 		minlength: 1,
// 		trim: true
// 	},
// 	completed: {
// 		type: Boolean,
// 		default: false
// 	},
// 	completedAt: {
// 		type: Number,
// 		default: null
// 	}
// });
//
// let newTodo = new Todo({
// 	text: '   Study   '
// 	// completed: false,
// 	// completedAt: 123456789
// });
//
// newTodo.save().then((doc) => {
// 	console.log('Saved todo', doc);
// }, (e) => {
// 	console.log('Unable to save todo', e);
// });

let User = mongoose.model('User', {
	email: {
		type: String,
		trim: true,
		required: true,
		minlength: 1
	}
});

let newUser = new User({
	email: 'dontreyenero@gmail.com'
});

newUser.save().then((doc) => {
	console.log('Saved user', doc);
}, (e) => {
	console.log('Unable to save user', e);
});