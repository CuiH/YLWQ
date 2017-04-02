const clubModel = require('../model/clubModel');
const userClubMapModel = require('../model/userClubMapModel');

const values = require('../config/value');


const clubService = {
	/* params = {founder_user_id, name, brief_intro} */
	/* results = {clubId} */
	createClub: (params) => {
		/*
		 a) create a new 'club' with 'user' [id]
		 b) create a new 'user_club_map' with 'club' [id] and 'user' [id]
		 */
		let clubId = null;
		return clubModel.create(params)
			.then((result) => {
				clubId = result.insertId;

				return userClubMapModel.create({
					user_id: params.founder_user_id,
					club_id: clubId,
					role: values.USER_CLUB_ROLE_FOUNDER
				});
			})
			.then(() => {
				return {clubId: clubId};
			});
	},

	/* params = {user_id} */
	/* results = {clubs} */
	getAllClubsByUserId: (params) => {
		/*
		 a) get all 'club' by [user_id], using 'user_club_map'
		 */
		return clubModel.findAllByUserId(params)
			.then((results) => {
				return {clubs: results};
			});
	},

	/* params = {id} */
	/* results = {club} */
	getClubById: (params) => {
		/*
		 a) get a 'club' by [id]
		 */
		return clubModel.findOneById(params)
			.then((results) => {
				return {club: results[0]};
			});
	},

};

module.exports = clubService;
