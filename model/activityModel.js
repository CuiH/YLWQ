const query = require('../util/mysqlPool');

const activitySql = require('../sql/activitySql');
const userActivityJoinSql = require('../sql/userActivityJoinSql');

const value = require('../config/value');


const activityModel = {
	/* params = {sponsor_user_id, club_id, name, start_time, end_time, location, brief_intro, note, status} */
	create: (params, callback) => {
		let now = new Date();
		query(activitySql.insert, [params.sponsor_user_id, params.club_id, params.name, params.start_time,
				params.end_time, params.location, params.brief_intro, params.note,
				params.status, now, value.ACTIVITY_BILL_STATUS_UNPUBLISHED],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	// results: a.*, u.username
	/* params = {id} */
	findOneById: (params, callback) => {
		query(userActivityJoinSql.selectOneByActivityId, [params.id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {id} */
	increaseParticipantNumberByOneById: (params, callback) => {
		query(activitySql.increaseParticipantNumberByOneById, [params.id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {club_id} */
	findAllByClubId: (params) => {
		return new Promise((resolve, reject) => {
			query(activitySql.selectAllByClubId, [params.club_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});

	},

	/* params = {user_id} */
	findAllByUserId: (params) => {
		return new Promise((resolve, reject) => {
			query(userActivityJoinSql.selectAllByUserId, [params.user_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {sponsor_user_id} */
	findAllByUserId2: (params) => {
		return new Promise((resolve, reject) => {
			query(activitySql.selectAllByUserId, [params.sponsor_user_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {id, activity_bill_status} */
	updateActivityBillStatusById: (params, callback) => {
		query(activitySql.updateActivityBillStatusById, [params.activity_bill_status, params.id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},
};

module.exports = activityModel;
