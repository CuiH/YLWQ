const query = require('../util/mysqlPool');

const userDetailSql = require('../sql/userDetailSql');


const userDetailModel = {
	/* params = {id} */
	create: (params, callback) => {
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
	}
};

module.exports = userDetailModel;
