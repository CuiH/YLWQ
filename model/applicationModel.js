const query = require('../util/mysqlPool');

const applicationSql = require('../sql/applicationSql');

const value = require('../config/value');


const applicationModel = {
	/* params = {applicant_user_id, club_id, message} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			let now = new Date();
			query(applicationSql.insert, [params.applicant_user_id, params.club_id, now, value.APPLICATION_STATUS_UNHANDLED, params.message],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {applicant_user_id, club_id, status} */
	findAllByApplicantUserIdAndClubIdAndStatus: (params) => {
		return new Promise((resolve, reject) => {
			query(applicationSql.selectOneByApplicantUserIdAndClubIdAndStatus, [params.applicant_user_id, params.club_id, params.status],
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
	findOneByAId: (params) => {
		return new Promise((resolve, reject) => {
			query(applicationSql.selectOneById, [params.id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {id, status, replier_user_id} */
	updateByAId: (params) => {
		return new Promise((resolve, reject) => {
			let now = new Date();
			query(applicationSql.updateById, [params.status, params.replier_user_id, now, params.id],
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

module.exports = applicationModel;
