const query = require('../util/mysqlPool');

const activityBillSql = require('../sql/activityBillSql');

const value = require('../config/value');


const activityBillModel = {
	/* params = {id, note, total_cost} */
	create: (params, callback) => {
		let now = new Date();
		query(activityBillSql.insert, [params.id, params.note, params.total_cost, now, value.ACTIVITY_BILL_STATUS_PUBLISHING, now],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {id} */
	findOneById: (params, callback) => {
		let now = new Date();
		query(activityBillSql.selectOneById, [params.id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
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
