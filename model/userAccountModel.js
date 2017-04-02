const query = require('../util/mysqlPool');

const userAccountSql = require('../sql/userAccountSql');


const userAccountModel = {
	/* params = {id, balance} */
	create: (params, callback) => {
		return new Promise((resolve, reject) => {
			query(userAccountSql.insert, [params.id, params.balance],
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

module.exports = userAccountModel;
