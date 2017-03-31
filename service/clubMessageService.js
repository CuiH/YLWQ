const clubMessageModel = require('../model/clubMessageModel');


const clubMessageService = {
	/* params = {operator_user_id, club_id, title, content, type, target_id, target_name} */
	/* callback: (err, results = {clubId}) */
	createClubMessage: (params, callback) => {
		// TODO verify params


		/*
		 a) create a new 'club_message'
		 */
		clubMessageModel.create(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {clubId: results.club_id});
			}
		);
	},

	/* params = {club_id} */
	/* callback: (err, results = {clubMessages}) */
	getAllClubMessagesByClubId: (params, callback) => {
		// TODO verify params


		/*
		 a) get all 'club_message' by [club_id]
		 */
		clubMessageModel.findAllByClubId(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {clubMessages: results});
			}
		);
	},

	/* params = {club_id} */
	/* callback: (err, results = {clubMessages}) */
	getLatestThreeClubMessagesByClubId: (params, callback) => {
		// TODO verify params


		/*
		 a) get latest three 'club_message' by [club_id]
		 */
		clubMessageModel.findLatestThreeByClubId(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {clubMessages: results});
			}
		);
	},
};

module.exports = clubMessageService;
