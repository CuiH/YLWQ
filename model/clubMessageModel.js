const query = require('../util/mysqlPool');

const clubMessageSql = require('../sql/clubMessageSql');


const cluMessageModel = {
	/* params = {operator_user_id, club_id, title, content, type, target_id, target_name} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			let now = new Date();
			query(clubMessageSql.insert, [params.operator_user_id, params.club_id, params.title,
					params.content, params.type, now, params.target_id, params.target_name],
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
	findLatestThreeByClubId: (params) => {
		return new Promise((resolve, reject) => {
			query(clubMessageSql.selectLatestThreeByClubId, [params.club_id],
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

module.exports = cluMessageModel;
