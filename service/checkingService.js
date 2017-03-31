const userClubMapModel = require('../model/userClubMapModel');


const checkingService = {
	/* params = {user_id, club_id} */
	/* callback: (err, results = {result}) */
	checkUserClubMap: (params, callback) => {
		// TODO verify params


		/*
		 a) check whether the user belongs to the club
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
};

module.exports = checkingService;
