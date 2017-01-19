const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

//Todo.findOneAndRemove({})

Todo.findByIdAndRemove('588149664c9ec87bf453f3c0').then((todo) => {
	console.log(todo);
});