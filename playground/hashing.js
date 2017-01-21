const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = 'indeed';

// bcrypt.genSalt(10, (err, salt) => {
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log(hash);
// 	});
// });

let hashedPassword = '$2a$10$9y7DumoLdt3I7.9r8..X/.ZrahxqBf85Mmw/ZmzNGsx21FKKVOX8e';
bcrypt.compare(password, hashedPassword, (err, res) => {
	console.log(res);
});


// let data = {
// 	id: 10
// };
//
// let token = jwt.sign(data, '123abc');
// console.log(token);
//
// let decoded = jwt.verify(token, '123abc');
//
// console.log('decoded', decoded);



// let msg = 'I am user number 3';
// let hash = SHA256(msg).toString();
//
// console.log(`Message: ${msg}`);
// console.log(`Hash: ${hash}`);
//
// let data = {
// 	id: 4
// };
//
// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
// 	console.log('Data is the same.')
// } else {
// 	console.log('Data changed... Dot trust!');
// }