const userModel = require('../model/userModel');
const userAccountModel = require('../model/userAccountModel');

const userController = {
	createUser: (params, callback) => {
		new Promise((resolve, reject) => {
			userAccountModel.create(0,
				(err, results) => {
					if (err) {
						reject(err);
					}
					console.log('1.2');
					resolve(results);
				}
			);
		})
		.then((results) => {
			params.userAccountId = results.insertId;
			userModel.create(params, callback);
		});
	},

	getAllUsers: (callback) => {
		userModel.findAll(callback);
	}
};

module.exports = userController;
