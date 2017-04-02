const query = require('../util/mysqlPool');

const notificationSql = require('../sql/notificationSql');


const notificationModel = {
	/* params = {title, content, type, object_id, object_name, subject_id, subject_name} */
	create: (params, callback) => {
		let now = new Date();
		query(notificationSql.insert, [params.title, params.content, now, params.type,
				params.object_id, params.object_name, params.subject_id, params.subject_name],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {user_id} */
	findAllByUserId: (params) => {
		return new Promise((resolve, reject) => {
			query(notificationSql.selectAllByUserId, [params.user_id],
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

module.exports = notificationModel;
