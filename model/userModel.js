const query = require('../util/mysqlPool');

const userSql = require('../sql/userSql');
const userActivityJoinSql = require('../sql/userActivityJoinSql');
const userClubJoinSql = require('../sql/userClubJoinSql');


const userModel = {
	/* params = {username, password} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			let now = new Date();
			query(userSql.insert, [params.username, params.password, now, now],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {username} */
	findOneByUsername: (params) => {
		return new Promise((resolve, reject) => {
			query(userSql.selectOneByUsername, [params.username],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {id} */
	findOneById: (params) => {
		return new Promise((resolve, reject) => {
			query(userSql.selectOneById, [params.id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});

	},

	/* params = {id} */
	updateLastLoginTimeById: (params) => {
		return new Promise((resolve, reject) => {
			let now = new Date();
			query(userSql.updateLastLoginTimeById, [now, params.id],
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
			query(userActivityJoinSql.selectAllByActivityId, [params.activity_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {club_id} */
	findAllByClubId: (params) => {
		return new Promise((resolve, reject) => {
			query(userClubJoinSql.selectAllByClubId, [params.club_id],
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

module.exports = userModel;
