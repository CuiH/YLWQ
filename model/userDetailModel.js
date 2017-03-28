const query = require('../util/mysqlPool');

const userDetailSql = require('../sql/userDetailSql');


const userDetailModel = {
	/* params = {id} */
	create: (params, callback) => {
		query(userDetailSql.insert, [params.id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	}
};

module.exports = userDetailModel;
