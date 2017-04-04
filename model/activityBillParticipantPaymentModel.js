const query = require('../util/mysqlPool');

const activityBillParticipantPaymentSql = require('../sql/activityBillParticipantPaymentSql');


const activityBillParticipantPaymentModel = {
	/* params = {activity_bill_id, participant_user_id, amount} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			query(activityBillParticipantPaymentSql.insert, [params.activity_bill_id,
					params.participant_user_id, params.amount],
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
			query(activityBillParticipantPaymentSql.selectAllByActivityBillId, [params.activity_bill_id],
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

module.exports = activityBillParticipantPaymentModel;
