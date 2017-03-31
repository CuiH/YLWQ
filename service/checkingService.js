const userClubMapModel = require('../model/userClubMapModel');
const userActivityMapModel = require('../model/userActivityMapModel');

const value = require('../config/value');


const checkingService = {
	/* params = {user_id, club_id} */
	/* callback: (err, results = {result}) */
	checkUserClubMap: (params, callback) => {
		// TODO verify params


		/*
		 a) check whether the user is a member of the club
		 */
		userClubMapModel.findOneByUserIdAndClubId(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				if (results.length == 0) {
					return callback(null, {result: false});
				}

				return callback(null, {result: true});
			}
		);
	},

	/* params = {user_id, club_id} */
	/* callback: (err, results = {result}) */
	checkUserClubMapAdmin: (params, callback) => {
		// TODO verify params


		/*
		 a) check whether the user is an admin of the club
		 */
		userClubMapModel.findAllAdminsByClubId({club_id: params.club_id},
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				for (let i = 0; i < results.length; i++) {
					if (params.user_id == results[i].user_id) {
						return callback(null, {result: true});
					}
				}

				return callback(null, {result: false});
			}
		);
	},

	/* params = {user_id, activity_id} */
	/* callback: (err, results = {result}) */
	checkUserActivityMap: (params, callback) => {
		// TODO verify params


		/*
		 a) check whether the user belongs to the club
		 */
		userActivityMapModel.findOneByUserIdAndActivityId(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				if (results.length == 0) {
					return callback(null, {result: false});
				}

				return callback(null, {result: true});
			}
		);
	},
};

module.exports = checkingService;
