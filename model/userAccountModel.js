const query = require('../util/mysqlPool');

const userAccountSql = require('../sql/userAccountSql');


const userAccountModel = {
	/* params = {id, balance} */
	create: (params) => {
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
	},

	/* params = {id, balance_change} */
	updateBalanceById: (params) => {
		return new Promise((resolve, reject) => {
			query(userAccountSql.updateBalanceById, [params.balance_change, params.id],
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
			query(userAccountSql.selectOneById, [params.id],
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

module.exports = userAccountModel;
