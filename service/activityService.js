const activityModel = require('../model/activityModel');
const activityBillModel = require('../model/activityBillModel');
const userActivityMapModel = require('../model/userActivityMapModel');

const values = require('../config/value');


const activityService = {
	/* params = {sponsor_user_id, club_id, name, start_time, end_time, location, brief_intro, note} */
	/* results = {activityId} */
	createActivity: (params) => {
		/*
		 a) create a new 'activity'
		 */
		return activityModel.create(params)
			.then((result) => {
				return {activityId: result.insertId};
			});
	},

	/* params = {user_id, activity_id} */
	/* results = {} */
	attendActivity: (params) => {
		/*
		 a) create a new 'user_activity_map'
		 b) update the [participant_number] in 'activity'
		 */
		return userActivityMapModel.create(params)
			.then(results => activityModel.increaseParticipantNumberByOneById({id: params.activity_id}))
			.then(() => {
				return {};
			});
	},

	/* params = {user_id} */
	/* results = {activities} */
	getAllParticipatedActivitiesByUserId: (params) => {
		/*
		 a) get all participated 'activity' by [user_id], using the 'user_activity_map'
		 */
		return activityModel.findAllByUserId(params)
			.then((results) => {
				return {activities: results};
			});
	},

	/* params = {user_id} */
	/* results = {activities} */
	getAllSponsoredActivitiesByUserId: (params) => {
		/*
		 a) get all sponsored 'activity' by [user_id], using the 'user_activity_map'
		 */
		return activityModel.findAllByUserId2({sponsor_user_id: params.user_id})
			.then((results) => {
				return {activities: results};
			});
	},

	/* params = {club_id} */
	/* results = {activities} */
	getAllActivitiesByClubId: (params) => {
		/*
		 a) get all 'activity' by [club_id]
		 */
		return activityModel.findAllByClubId(params)
			.then((results) => {
				return {activities: results};
			});
	},

	/* params = {id} */
	/* results = {activity} */
	getActivityById: (params) => {
		/*
		 a) get the 'activity' by id
		 */
		return activityModel.findOneById(params)
			.then((results) => {
				return {activity: results[0]};
			});
	},

	/* params = {id, start_time, end_time, location, brief_intro, note} */
	/* results = {} */
	updateActivityById: (params) => {
		/*
		 a) update a 'activity' by id
		 */
		return activityModel.updateOneById(params)
			.then((results) => {
				return {};
			});
	},
};

module.exports = activityService;
