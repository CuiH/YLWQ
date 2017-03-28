const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controller/userController');

const userRoute = express.Router();

userRoute.use(bodyParser.urlencoded({extended: false}));

userRoute.route('/')
	.get((req, res, next) => {
		userController.getAllUsers((err, results) => {
			if (err) {
				// handle error
			}

			res.render('all_user', {'users': results});
		});
	})
	.post((req, res, next) => {
		userController.createUser(req.body,
			(err, results) => {
				if (err) {
					// handle error
				}

				res.end('success!');
			}
		);

	});


module.exports = userRoute;
