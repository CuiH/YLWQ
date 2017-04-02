const clubModel = require('../model/clubModel');
const userClubMapModel = require('../model/userClubMapModel');
const clubMessageModel = require('../model/clubMessageModel');
const activityModel = require('../model/activityModel');
const clubBulletinModel = require('../model/clubBulletinModel');

const values = require('../config/value');


// create a new 'club'
/* params = {founder_user_id, name, brief_intro} */
const generateCreateClubPromise = (params) => {
	return new Promise((resolve, reject) => {
		clubModel.create(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve(results);
			}
		);
	});
};

// create a new 'user_club_map' with 'club' [id] and 'user' [id]
/* params = {founder_user_id, club_id} */
const generateCreateUserClubMapPromise = (params) => {
	return new Promise((resolve, reject) => {
		userClubMapModel.create({user_id: params.founder_user_id, club_id: params.club_id,
				role: values.USER_CLUB_ROLE_FOUNDER},
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve({id: params.club_id});
			}
		);
	});
};


const clubService = {
	/* params = {founder_user_id, name, brief_intro} */
	/* callback: (err, results = {clubId}) */
	createClub: (params, callback) => {
		// TODO verify params


		/*
		 a) create a new 'club' with 'user' [id]
		 b) create a new 'user_club_map' with 'club' [id] and 'user' [id]
		 */
		generateCreateClubPromise(params)
			.then((result) => {
				return generateCreateUserClubMapPromise({founder_user_id: params.founder_user_id, club_id: result.insertId});
			}).then((result) => {
				callback(null, {clubId: result.id});
			}).catch((err) => {
				callback(err, null);
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

	/* params = {user_id} */
	/* callback: (err, results = {club}) */
	getClubByName: (params, callback) => {
		// TODO verify params


		/*
		 a) get a 'club' by [name]
		 */
		clubModel.findOneByName(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				if (results.length == 0) {
					return callback(new Error("no such club."), null);
				}

				callback(null, {club: results[0]});
			}
		);
	},

	/* params = {id} */
	/* callback: (err, results = {club}) */
	getClubById: (params, callback) => {
		// TODO verify params


		/*
		 a) get a 'club' by [id]
		 */
		clubModel.findOneById(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				if (results.length == 0) {
					return callback(new Error("no such club."), null);
				}

				callback(null, {club: results[0]});
			}
		);
	},

};

module.exports = clubService;
