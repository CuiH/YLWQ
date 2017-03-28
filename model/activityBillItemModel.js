const query = require('../util/mysqlPool');

const activityBillItemSql = require('../sql/activityBillItemSql');


const activityBillItemModel = {
	/* params = {activity_bill_id, description, cost, note, payer_user_id} */
	create: (params, callback) => {
		let now = new Date();
		query(activityBillItemSql.insert, [params.activity_bill_id, params.description,
				params.cost, params.note, params.payer_user_id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {activity_bill_id} */
	findAllByActivityBillId: (params, callback) => {
		query(activityBillItemSql.selectAllByActivityBillId, [params.activity_bill_id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	}
};

module.exports = activityBillItemModel;
