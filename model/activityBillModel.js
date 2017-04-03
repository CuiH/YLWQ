const query = require('../util/mysqlPool');

const activityBillSql = require('../sql/activityBillSql');

const value = require('../config/value');


const activityBillModel = {
	/* params = {id, note, publisher_user_id} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			let now = new Date();
			query(activityBillSql.insert, [params.id, params.note, now, value.ACTIVITY_BILL_STATUS_PUBLISHING, params.publisher_user_id, now],
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
			let now = new Date();
			query(activityBillSql.selectOneById, [params.id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {id, total_cost_change} */
	updateTotalCostAndLastModifyTimeById: (params, callback) => {
		let now = new Date();
		query(activityBillSql.updateLastModifyTimeById, [params.total_cost_change, now, params.id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},
};

module.exports = activityBillModel;
