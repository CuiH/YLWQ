const query = require('../util/mysqlPool');

const userNotificationMapSql = require('../sql/userNotificationMapSql');


const userNotificationMapModel = {
	/* params = {user_id, notification_id} */
	create: (params, callback) => {
		query(userNotificationMapSql.insert, [params.user_id, params.notification_id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {user_id, notification_id} */
	updateIsReadById: (params, callback) => {
		let now = new Date();
		query(userNotificationMapSql.updateIsReadByUserIdAndNotification, [now, params.user_id, params.notification_id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {user_id, notification_id} */
	findOneById: (params, callback) => {
		query(userNotificationMapSql.selectOneByUserIdAndNotificationId, [params.user_id, params.notification_id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},
};

module.exports = userNotificationMapModel;
