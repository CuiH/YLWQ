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
	/* results = {clubBulletins} */
	getAllClubBulletinsByClubId: (params, callback) => {
		/*
		 a) get all 'club_bulletin' by [club_id]
		 */
		return clubBulletinModel.findAllByClubId(params)
			.then((results) => {
				return {clubBulletins: results};
			});
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
