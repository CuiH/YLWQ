const query = require('../util/mysqlPool');

const clubSql = require('../sql/clubSql');
const userClubJoinSql = require('../sql/userClubJoinSql');


const clubModel = {
	/* params = {founder_user_id, name, brief_intro} */
	create: (params, callback) => {
		let now = new Date();
		query(clubSql.insert, [params.founder_user_id, params.name, params.brief_intro, now],
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
		query(userClubJoinSql.selectOneByClubId, [params.id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {name} */
	findOneByName: (params, callback) => {
		query(userClubJoinSql.selectOneByClubName, [params.name],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {user_id} */
	findAllByUserId: (params, callback) => {
		query(userClubJoinSql.selectAllByUserId, [params.user_id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {id} */
	increaseMemberNumberByOneById: (params, callback) => {
		query(clubSql.increaseMemberNumberByOneById, [params.id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},
};

module.exports = clubModel;
