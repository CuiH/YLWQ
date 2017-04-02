const clubBulletinModel = require('../model/clubBulletinModel');


const clubBulletinService = {
	/* params = {publisher_user_id, title, content, club_id} */
	/* results = {clubBulletinId}) */
	createClubBulletin: (params) => {
		/*
		 a) create a new 'club_bulletin'
		 */
		return clubBulletinModel.create(params)
			.then((results) => {
				return {clubBulletinId: results.insertId};
			});
	},

	/* params = {club_id} */
	/* callback: (err, results = {clubBulletins}) */
	getAllClubBulletinsByClubId: (params, callback) => {
		// TODO verify params


		/*
		 a) get all 'club_bulletin' by [club_id]
		 */
		clubBulletinModel.findAllByClubId(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {clubBulletins: results});
			}
		);
	},

	/* params = {club_id} */
	/* results = {clubBulletin} */
	getLatestClubBulletinByClubId: (params, callback) => {
		/*
		 a) get the latest 'club_bulletin' by [club_id]
		 */
		return clubBulletinModel.findLatestOneByClubId(params)
			.then((results) => {
				return {clubBulletin: results[0]};
			});
	},
};

module.exports = clubBulletinService;
