const query = require('../util/mysqlPool');

const userDetailSql = require('../sql/userDetailSql');


const userDetailModel = {
	/* params = {id} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			query(userDetailSql.insert, [params.id],
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
			query(userDetailSql.selectOneById, [params.id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {id, gender, description, birthdate} */
	updateOneById: (params) => {
		return new Promise((resolve, reject) => {
			query(userDetailSql.updateById, [params.birthdate, params.gender, params.description, params.id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},
};

module.exports = userDetailModel;
