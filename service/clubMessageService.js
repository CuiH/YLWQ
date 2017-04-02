const clubMessageModel = require('../model/clubMessageModel');


const clubMessageService = {
	/* params = {operator_user_id, club_id, title, content, type, target_id, target_name} */
	/* results = {clubId} */
	createClubMessage: (params) => {
		/*
		 a) create a new 'club_message'
		 */
		return clubMessageModel.create(params)
			.then((result) => {
				return {clubMessageId: result.insertId};
			});
	},

	/* params = {club_id} */
	/* results = {clubMessages} */
	getLatestThreeClubMessagesByClubId: (params) => {
		/*
		 a) get latest three 'club_message' by [club_id]
		 */
		return clubMessageModel.findLatestThreeByClubId(params)
			.then((results) => {
				return {clubMessages: results};
			})
	},
};

module.exports = clubMessageService;
