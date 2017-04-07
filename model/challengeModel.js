/**
 * Created by CuiH on 2017/4/6.
 */

const query = require('../util/mysqlPool');

const challengeSql = require('../sql/challengeSql');


const challengeModel = {
	/* params = {challenger_user_id, activity_bill_id, message} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			query(challengeSql.insert, [params.challenger_user_id, params.activity_bill_id, params.message],
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
			query(challengeSql.selectAllByActivityBillId, [params.activity_bill_id],
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
	deleteOneById: (params) => {
		return new Promise((resolve, reject) => {
			query(challengeSql.deleteOneById, [params.id],
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
			query(challengeSql.selectOneById, [params.id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {challenger_user_id, activity_bill_id} */
	findOneByUserIdAndActivityBillId: (params) => {
		return new Promise((resolve, reject) => {
			query(challengeSql.selectOneByUserIdAndActivityBillId, [params.challenger_user_id, params.activity_bill_id],
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

module.exports = challengeModel;
