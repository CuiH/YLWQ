const query = require('../util/mysqlPool');

const activityBillSql = require('../sql/activityBillSql');

const value = require('../config/value');


const activityBillModel = {
	/* params = {id, publisher_user_id} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			query(activityBillSql.insert, [params.id, value.ACTIVITY_BILL_STATUS_PUBLISHING, params.publisher_user_id],
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

	/* params = {id} */
	updateLastModifyTimeById: (params) => {
		return new Promise((resolve, reject) => {
			query(activityBillSql.updateLastModifyTimeById, [params.id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {id, status} */
	updateStatusById: (params) => {
		return new Promise((resolve, reject) => {
			query(activityBillSql.updateStatusById, [params.status, params.id],
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

module.exports = activityBillModel;
