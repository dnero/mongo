const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
	let joe, blogPost;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		blogPost = new BlogPost({ title: 'JS is great', content: 'Indeed, it is' });

		joe.blogPosts.push(blogPost); // add the blog post to the user Joe

		Promise.all([joe.save(), blogPost.save()])
			.then(() => done());
	});

	it('users clean up dangling blogposts on remove', (done) => {
		joe.remove()
			.then(() => BlogPost.count()) // get total number of blogposts
			.then((count) => {
				assert(count === 0); // blogpost count should be 0 because we've only created a single one
				done();
			});
	});
});