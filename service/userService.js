const jwt = require('jsonwebtoken');

const userModel = require('../model/userModel');
const userAccountModel = require('../model/userAccountModel');
const userClubMapModel = require('../model/userClubMapModel');
const userDetailModel = require('../model/userDetailModel');

const tokenValues = require('../config/token');


// create a new 'user'
/* params = {username, password} */
const generateCreateUserPromise = (params) => {
	return new Promise((resolve, reject) => {
		userModel.create(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve(results);
			}
		);
	});
};

// create a new 'user_detail' with the same [id] as 'user'
/* params = {user_id} */
const generateCreateUserAccountPromise = (params)=>  {
	return new Promise((resolve, reject) => {
		userAccountModel.create({id: params.user_id, balance: 0},
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve(params);
			}
		);
	});
};

// create a new 'user_balance' with the same [id] as 'user'
/* params = {user_id} */
const generateCreateUserDetailPromise = (params) => {
	return new Promise((resolve, reject) => {
		userDetailModel.create({id: params.user_id},
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve(params);
			}
		);
	});
};

// get 'user' with [username] and verify the [password]
/* params = {username, password} */
const generateFindUserPromise = (params) => {
	return new Promise((resolve, reject) => {
		userModel.findOneByUsername(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				if (results.length == 0) {
					return reject(new Error('no such user'));
				}

				const user = results[0];
				if (user.password != params.password) {
					return reject(new Error('wrong password.'));
				}

				resolve(user);
			}
		);
	});
};

// update the [last_login]
/* params = {user_id} */
const generateUpdateUserPromise = (params) => {
	return new Promise((resolve, reject) => {
		userModel.updateLastLoginTimeById({id: params.user_id},
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve({id: params.user_id});
			}
		);
	});
};


const userService = {
	/* params = {username, password} */
	/* callback: (err, results = {userId}) */
	createUser: (params, callback) => {
		// TODO verify params


		/*
		 a) create a new 'user'
		 b) create a new 'user_detail' with the same [id] as 'user'
		 &  create a new 'user_balance' with the same [id] as 'user'
		 */
		generateCreateUserPromise(params).then((result) => {
			return Promise.all([generateCreateUserAccountPromise({user_id: result.insertId}),
				generateCreateUserDetailPromise({user_id: result.insertId})]);
		}).then((results) => {
			callback(null, {userId: results[0].user_id});
		}).catch((err) => {
			callback(err, null);
		});
	},

	/* params = {username, password} */
	/* callback: (err, results = {userId, token}) */
	signIn: (params, callback) => {
		// TODO verify params


		/*
		 a) get 'user' with [username]
		 b) verify the [password]
		 c) update the [last_login]
		 d) generate token
		 */
		generateFindUserPromise(params).then((result) => {
			return generateUpdateUserPromise({user_id: result.id});
		}).then((result) => {
			// generate token
			const token = jwt.sign({id: result.id, username: params.username}, tokenValues.TOKEN_SECRET,
				{expiresIn: tokenValues.TOKEN_EXPIRATION});
			callback(null, {userId: result.id, token: token});
		}).catch((err) => {
			callback(err, null);
		})
	},

	/* params = {activity_id} */
	/* callback: (err, results = {participants}) */
	getAllParticipantsByActivityId: (params, callback) => {
		// TODO verify params


		/*
		 a) get all 'user' by [activity_id], using 'user_activity_map'
		 */
		userModel.findAllByActivityId(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {participants: results});
			}
		);
	},

	/* params = {club_id} */
	/* callback: (err, results = {members}) */
	getAllMembersByClubId: (params, callback) => {
		// TODO verify params


		/*
		 a) get all 'user' by [club_id]
		 */
		userModel.findAllByClubId(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {members: results});
			}
		);
	},

	/* params = {club_id} */
	/* callback: (err, results = {admins}) */
	getAllAdminsByClubId: (params, callback) => {
		// TODO verify params


		/*
		 a) get all admin 'user' by [club_id]
		 */
		userClubMapModel.findAllByClubIdAndRole(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {admins: results});
			}
		);
	},
};

module.exports = userService;
