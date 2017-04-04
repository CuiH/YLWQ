const query = require('../util/mysqlPool');

const userNotificationMapSql = require('../sql/userNotificationMapSql');


const userNotificationMapModel = {
	/* params = {user_id, notification_id} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			query(userNotificationMapSql.insert, [params.user_id, params.notification_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {user_id, notification_id} */
	updateIsReadByUserIdAndNotificationId: (params) => {
		return new Promise((resolve, reject) => {
			query(userNotificationMapSql.updateIsReadByUserIdAndNotificationId, [params.user_id, params.notification_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {user_id, notification_id} */
	findOneByUserIdAndNotificationId: (params) => {
		return new Promise((resolve, reject) => {
			query(userNotificationMapSql.selectOneByUserIdAndNotificationId, [params.user_id, params.notification_id],
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

module.exports = userNotificationMapModel;
