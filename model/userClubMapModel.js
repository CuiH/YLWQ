const query = require('../util/mysqlPool');

const userClubMapSql = require('../sql/userClubMapSql');

const value = require('../config/value');


const userClubMapModel = {
	/* params = {club_id, user_id, role} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			let now = new Date();
			query(userClubMapSql.insert, [params.club_id, params.user_id, now, params.role],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {user_id} */
	findAllByUserId: (params, callback) => {
		query(userClubMapSql.selectAllByUserId, [params.user_id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {user_id, club_id} */
	findOneByUserIdAndClubId: (params) => {
		return new Promise((resolve, reject) => {
			query(userClubMapSql.selectOneByUserIdAndClubId, [params.user_id, params.club_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {user_id, activity_id} */
	findOneByUserIdAndActivityId: (params) => {
		return new Promise((resolve, reject) => {
			query(userClubMapSql.selectOneByUserIdAndActivityId, [params.user_id, params.activity_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {user_id, application_id} */
	findOneByUserIdAndApplicationId: (params) => {
		return new Promise((resolve, reject) => {
			query(userClubMapSql.selectOneByUserIdAndApplicationId, [params.user_id, params.application_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});

	},

	/* params = {user_id, club_bulletin_id} */
	findOneByUserIdAndClubBulletinId: (params, callback) => {
		query(userClubMapSql.selectOneByUserIdAndClubBulletinId, [params.user_id, params.club_bulletin_id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {club_id} */
	findAllAdminsByClubId: (params) => {
		return new Promise((resolve, reject) => {
			query(userClubMapSql.selectAllByClubIdAndRole, [params.club_id,
					value.USER_CLUB_ROLE_ADMIN, value.USER_CLUB_ROLE_FOUNDER],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {activity_id} */
	findAllByActivityId: (params) => {
		return new Promise((resolve, reject) => {
			query(userClubMapSql.selectAllByActivityId, [params.activity_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	}
};

module.exports = userClubMapModel;
