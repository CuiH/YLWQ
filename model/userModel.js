const query = require('../util/mysqlPool');

const userSql = require('../sql/userSql');
const userActivityJoinSql = require('../sql/userActivityJoinSql');
const userClubJoinSql = require('../sql/userClubJoinSql');


const userModel = {
	/* params = {username, password} */
	create: (params, callback) => {
		let now = new Date();
		query(userSql.insert, [params.username, params.password, now, now],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {username} */
	findOneByUsername: (params, callback) => {
		query(userSql.selectOneByUsername, [params.username],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {id} */
	findOneById: (params, callback) => {
		query(userSql.selectOneById, [params.id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {id} */
	updateLastLoginTimeById: (params, callback) => {
		let now = new Date();
		query(userSql.updateLastLoginTimeById, [now, params.id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {activity_id} */
	findAllByActivityId: (params, callback) => {
		query(userActivityJoinSql.selectAllByActivityId, [params.activity_id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {club_id} */
	findAllByClubId: (params, callback) => {
		query(userClubJoinSql.selectAllByClubId, [params.club_id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	}
};

module.exports = userModel;
