const clubBulletinModel = require('../model/clubBulletinModel');


const clubBulletinService = {
	/* params = {publisher_user_id, title, content, club_id} */
	/* callback: (err, results = {clubBulletinId}) */
	createClubBulletin: (params, callback) => {
		// TODO verify params


		/*
		 a) create a new 'club_bulletin'
		 */
		clubBulletinModel.create(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {clubBulletinId: results.insertId});
			}
		);
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

	/* params = {id} */
	/* callback: (err, results = {clubBulletin}) */
	getClubBulletinById: (params, callback) => {
		// TODO verify params


		/*
		 a) get a 'club_bulletin' by [id]
		 */
		clubBulletinModel.findOneById(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {clubBulletin: results[0]});
			}
		);
	},
};

module.exports = clubBulletinService;
