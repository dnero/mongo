const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required.'],
		validate: {
			validator: (name) => name.length > 2,
			message: 'Name must be longer than 2 characters.'
		}
	},
	posts: [PostSchema],
	likes: Number,
	blogPosts: [{
		type: Schema.Types.ObjectId,
		ref: 'blogPost'
	}]
});

UserSchema.virtual('postCount').get(function() { // virtual properties do not get persisted in the db
	return this.posts.length;
});

UserSchema.pre('remove', function (next) {
	const BlogPost = mongoose.model('blogPost'); // reference to the blogPost model
	BlogPost.remove({ _id: { $in: this.blogPosts } }) // remove all blogposts with an id $in this/UserSchema.blogPosts
		.then(() => next()); // afterwards move on
});

const User = mongoose.model('user', UserSchema); // add this schema setup to the 'user' model

module.exports = User; // export it for useage elsewhere