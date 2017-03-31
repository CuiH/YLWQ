const activityModel = require('../model/activityModel');
const activityBillModel = require('../model/activityBillModel');
const userActivityMapModel = require('../model/userActivityMapModel');

const values = require('../config/value');


// create a new 'user_activity_map'
/* params = {user_id, activity_id} */
const generateCreateUserActivityMapPromise = (params) => {
	return new Promise((resolve, reject) => {
		userActivityMapModel.create(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve();
			}
		);
	});
};

// update the [participant_number] in 'activity'
/* params = {activity_id} */
const generateUpdateActivityPromise = (params) => {
	return new Promise((resolve, reject) => {
		activityModel.increaseParticipantNumberByOneById({id: params.activity_id},
			(err, results) => {
				if (err) {
					return reject(err, null);
				}

				resolve();
			}
		);
	})
};


const activityService = {
	/* params = {sponsor_user_id, club_id, name, start_time, end_time, location, brief_intro, note} */
	/* callback: (err, results = {activityId}) */
	createActivity: (params, callback) => {
		// TODO verify params

		/*
		 a) create a new 'activity'
		 */

		params.status = values.ACTIVITY_STATUS_RECRUITING;
		activityModel.create(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {activityId: results.insertId});
			}
		);
	},

	/* params = {user_id, activity_id} */
	/* callback: (err, results = {}) */
	attendActivity: (params, callback) => {
		// TODO verify params


		/*
		 a) create a new 'user_activity_map'
		 b) update the [participant_number] in 'activity'
		 */
		generateCreateUserActivityMapPromise(params)
			.then(() => {
				return generateUpdateActivityPromise(params);
			})
			.then(() => {
				callback(null, null);
			})
			.catch((err) => {
				callback(err, null);
			});
	},

	/* params = {user_id} */
	/* callback: (err, results = {activities}) */
	getAllParticipatedActivitiesByUserId: (params, callback) => {
		// TODO verify params


		/*
		 a) get all participated 'activity' by [user_id], using the 'user_activity_map'
		 */
		activityModel.findAllByUserId(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {activities: results});
			}
		);
	},

	/* params = {user_id} */
	/* callback: (err, results = {activities}) */
	getAllSponsoredActivitiesByUserId: (params, callback) => {
		// TODO verify params


		/*
		 a) get all sponsored 'activity' by [user_id], using the 'user_activity_map'
		 */
		activityModel.findAllByUserId2({sponsor_user_id: params.user_id},
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {activities: results});
			}
		);
	},

	/* params = {club_id} */
	/* callback: (err, results = {activities}) */
	getAllActivitiesByClubId: (params, callback) => {
		// TODO verify params


		/*
		 a) get all 'activity' by [club_id]
		 */
		activityModel.findAllByClubId(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {activities: results});
			}
		);
	},

	/* params = {id} */
	/* callback: (err, results = {activity}) */
	getActivityById: (params, callback) => {
		// TODO verify params


		/*
		 a) get the 'activity' by id
		 */
		activityModel.findOneById(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				if (results.length == 0) {
					return callback(new Error('no such activity.'), null);
				}

				callback(null, {activity: results[0]});
			}
		);
	},
};

module.exports = activityService;
