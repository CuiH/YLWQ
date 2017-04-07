const query = require('../util/mysqlPool');

const notificationSql = require('../sql/notificationSql');

const value = require('../config/value');

const notificationModel = {
	/* params = {title, content, type, object_id, object_name, subject_id, subject_name} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			query(notificationSql.insert, [params.title, params.content, params.type,
					params.object_id, params.object_name, params.subject_id, params.subject_name],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {user_id, page} */
	findAllByUserId: (params) => {
		return new Promise((resolve, reject) => {
			query(notificationSql.selectAllByUserId, [params.user_id, (params.page-1)*value.PAGE_SIZE],
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
