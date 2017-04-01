const query = require('../util/mysqlPool');

const applicationSql = require('../sql/applicationSql');

const value = require('../config/value');


const applicationModel = {
	/* params = {applicant_user_id, club_id, message} */
	create: (params, callback) => {
		let now = new Date();
		query(applicationSql.insert, [params.applicant_user_id, params.club_id, now, value.APPLICATION_STATUS_UNHANDLED, params.message],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {applicant_user_id, club_id, status} */
	findAllByApplicantUserIdAndClubIdAndStatus: (params, callback) => {
		let now = new Date();
		query(applicationSql.selectOneByApplicantUserIdAndClubIdAndStatus, [params.applicant_user_id, params.club_id, params.status],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {id} */
	findOneByAId: (params, callback) => {
		query(applicationSql.selectOneById, [params.id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},

	/* params = {id, status, replier_user_id} */
	updateByAId: (params, callback) => {
		let now = new Date();
		query(applicationSql.updateById, [params.status, params.replier_user_id, now, params.id],
			(err, results, fields) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, results);
			}
		);
	},
};

module.exports = applicationModel;
