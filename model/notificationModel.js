const query = require('../util/mysqlPool');

const notificationSql = require('../sql/notificationSql');


const notificationModel = {
	/* params = {title, content, type, target_id, target_name} */
	create: (params, callback) => {
		let now = new Date();
		query(notificationSql.insert, [params.title, params.content, now, params.type,
				params.target_id, params.target_name],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {user_id} */
	findAllByUserId: (params, callback) => {
		query(notificationSql.selectAllByUserId, [params.user_id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},
};

module.exports = notificationModel;
