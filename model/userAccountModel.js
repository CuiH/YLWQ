const query = require('../util/mysqlPool');

const userAccountSql = require('../sql/userAccountSql');


const userAccountModel = {
	/* params = {id, balance} */
	create: (params, callback) => {
		query(userAccountSql.insert, [params.id, params.balance],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	}
};

module.exports = userAccountModel;
