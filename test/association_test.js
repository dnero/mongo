const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
	let joe, blogPost, comment;
	
	beforeEach((done) => {
		joe = new User({name: 'Joe'});
		blogPost = new BlogPost({title: 'JS is great', content: 'Indeed, it is'});
		comment = new Comment({content: 'Congrats on your post'});

		joe.blogPosts.push(blogPost); // add the blog post to the user Joe
		blogPost.comments.push(comment); // add comment to blog post
		comment.user = joe; // make Joe the user that made this comment

		Promise.all([joe.save(), blogPost.save(), comment.save()])
			.then(() => done());
	});

	it.only('saves a relation between a user and a blogpost', (done) => {
		User.findOne({ name: 'Joe' })
			.then((user) => {
				console.log(user);
				done();
			});
	});
});