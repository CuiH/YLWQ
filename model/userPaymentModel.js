/**
 * Created by CuiH on 2017/4/7.
 */

const query = require('../util/mysqlPool');

const userPaymentSql = require('../sql/userPaymentSql');


const userPaymentModel = {
	/* params = {amount, description, user_id, type, target_id, target_name} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			query(userPaymentSql.insert, [params.amount, params.description, params.type,
					params.user_id, params.target_id, params.target_name],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {user_id} */
	findAllByUserId: (params) => {
		return new Promise((resolve, reject) => {
			query(userPaymentSql.selectAllByUserId, [params.user_id],
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

module.exports = userPaymentModel;
