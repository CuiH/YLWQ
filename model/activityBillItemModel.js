const query = require('../util/mysqlPool');

const activityBillItemSql = require('../sql/activityBillItemSql');


const activityBillItemModel = {
	/* params = {activity_bill_id, description, cost, note, payer_user_id} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			query(activityBillItemSql.insert, [params.activity_bill_id, params.description,
					params.cost, params.note, params.payer_user_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {activity_bill_id} */
	findAllByActivityBillId: (params) => {
		return new Promise((resolve, reject) => {
			query(activityBillItemSql.selectAllByActivityBillId, [params.activity_bill_id],
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

module.exports = activityBillItemModel;
