const query = require('../util/mysqlPool');

const userActivityMapSql = require('../sql/userActivityMapSql');


const userActivityMapModel = {
	/* params = {activity_id, user_id} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			query(userActivityMapSql.insert, [params.user_id, params.activity_id],
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
			query(userActivityMapSql.selectAllByActivityId, [params.activity_id],
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
			query(userActivityMapSql.selectOneByUserIdAndActivityId, [params.user_id, params.activity_id],
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

module.exports = userActivityMapModel;
