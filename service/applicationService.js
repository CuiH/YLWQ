const clubModel = require('../model/clubModel');
const applicationModel = require('../model/applicationModel');
const userClubMapModel = require('../model/userClubMapModel');

const value = require('../config/value');


/* update the 'application' by [id] */
/* params = {id, status, replier_user_id} */
const generateUpdateApplicationPromise = (params) => {
	return new Promise((resolve, reject) => {
		applicationModel.updateByAId(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve();
			}
		);
	});
};

/* get an 'application' by [id] */
/* params = {id} */
const generateFindApplicationPromise = (params) => {
	return new Promise((resolve, reject) => {
		applicationModel.findOneByAId(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve(results[0]);
			}
		);
	});
};

/* create a new 'user_club_role' */
/* params = {user_id, club_id} */
const generateCreateUserClubMapPromise = (params) => {
	return new Promise((resolve, reject) => {
		params.role = value.USER_CLUB_ROLE_MEMBER;
		userClubMapModel.create(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve({club_id: params.club_id});
			}
		);
	});
};

// update the [member_number] in 'club'
/* params = {club_id} */
const generateUpdateClubPromise = (params) => {
	return new Promise((resolve, reject) => {
		clubModel.increaseMemberNumberByOneById({id: params.club_id},
			(err, results) => {
				if (err) {
					return reject(err, null);
				}

				resolve();
			}
		);
	})
};

const applicationService = {
	/* params = {applicant_user_id, club_id} */
	/* callback: (err, results = {applicationId}) */
	createApplication: (params, callback) => {
		// TODO verify params


		/*
		 a) create a new 'application'
		 */
		applicationModel.create(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {applicationId: results.insertId});
			}
		);
	},

	/* params = {id} */
	/* callback: (err, results = {application}) */
	getApplicationById: (params, callback) => {
		// TODO verify params


		/*
		 a) get an 'application'
		 */
		applicationModel.findOneByAId(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {application: results[0]});
			}
		);
	},

	/* params = {application_id, replier_user_id} */
	/* callback: (err, results = {}) */
	acceptApplication: (params, callback) => {
		// TODO verify params


		/*
		 a) update the [status, replier_user_id, reply_time] of the 'application'
		 b) get the application (for its [applicant_user_id] and [club_id])
		 c) create a new 'user_club_map'
		 d) update the [member_number] in 'club'
		 */
		generateUpdateApplicationPromise({
			id: params.application_id,
			replier_user_id: params.replier_user_id,
			status: value.APPLICATION_STATUS_ACCEPTED
		}).then(() => {
			return generateFindApplicationPromise({id: params.application_id});
		}).then((result) => {
			return generateCreateUserClubMapPromise({user_id: result.applicant_user_id, club_id: result.club_id});
		}).then((result) => {
			return generateUpdateClubPromise(result);
		}).then(() => {
			callback(null, null);
		}).catch((err) => {
			return callback(err, null);
		});
	},

	/* params = {application_id, replier_user_id} */
	/* callback: (err, results = {}) */
	rejectApplication: (params, callback) => {
		// TODO verify params


		/*
		 a) update the [status, replier_user_id, reply_time] of the 'application'
		 */
		generateUpdateApplicationPromise({
			id: params.application_id,
			replier_user_id: params.replier_user_id,
			status: value.APPLICATION_STATUS_REJECTED
		}).then(() => {
			callback(null, null);
		}).catch((err) => {
			return callback(err, null);
		});
	},
};

module.exports = applicationService;
