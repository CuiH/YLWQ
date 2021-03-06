const userClubMapModel = require('../model/userClubMapModel');
const activityModel = require('../model/activityModel');
const applicationModel = require('../model/applicationModel');
const activityBillModel = require('../model/activityBillModel');
const userActivityMapModel = require('../model/userActivityMapModel');
const challengeModel = require('../model/challengeModel');

const value = require('../config/value');


const checkingService = {
	/* params = {user_id, club_id} */
	/* results = {result}) */
	checkUserClubMap: (params) => {
		/*
		 a) check whether the user is a member of the club
		 */
		return userClubMapModel.findOneByUserIdAndClubId(params)
			.then((results) => {
				if (results.length == 0) {
					return {result: false};
				}

				return {result: true};
			});
	},

	/* params = {user_id, club_id} */
	/* results = {result} */
	checkUserClubMapAdmin: (params) => {
		/*
		 a) check whether the user is an admin of the club
		 */
		return userClubMapModel.findAllAdminsByClubId({club_id: params.club_id})
			.then((results) => {
				for (let i = 0; i < results.length; i++) {
					if (params.user_id == results[i].user_id) {
						return {result: true};
					}
				}

				return {result: false};
			});
	},

	/* params = {user_id, activity_id} */
	/* results = {result} */
	checkUserActivityMap: (params) => {
		/*
		 a) check whether the user belongs to the club
		 */
		return userActivityMapModel.findOneByUserIdAndActivityId(params)
			.then((results) => {
				if (results.length == 0) {
					return {result: false};
				}

				return {result: true};
			}
		);
	},

	/* params = {user_id, activity_id} */
	/* results = {result}) */
	checkActivitySponsor: (params) => {
		/*
		 a) check whether the user is the sponsor of the activity
		 */
		return activityModel.findOneById({id: params.activity_id})
			.then((results) => {
				if (results.length == 0) {
					return {result: false};
				}

				if (results[0].sponsor_user_id == params.user_id) {
					return {result: true};
				}

				return {result: false};
			});
	},

	/* params = {user_id, club_id} */
	/* results = {result}) */
	checkApplicationUnread: (params) => {
		/*
		 a) check whether the user has sent an unread 'application' to the 'club'
		 */
		return applicationModel.findAllByApplicantUserIdAndClubIdAndStatus({
			applicant_user_id: params.user_id,
			club_id: params.club_id,
			status: value.APPLICATION_STATUS_UNHANDLED
		}).then((results) => {
			if (results.length == 0) {
				return {result: false};
			}

			return {result: true};
		});
	},

	/* params = {user_id, activity_bill_id} */
	/* results = {result}) */
	checkActivityBillCreator: (params) => {
		/*
		 a) check if the user is the creator of the 'activity_bill', and if the 'activity_bill' exists.
		 */
		return activityBillModel.findOneById({id: params.activity_bill_id})
			.then((results) => {
				if (results.length == 0 || results[0].publisher_user_id != params.user_id) {
					return {result: false};
				}

			return {result: true};
		});
	},

	/* params = {activity_bill_id} */
	/* results = {result}) */
	checkActivityBillUnfinished: (params) => {
		/*
		 a) check if the [status] of the 'activity_bill' is not finished, and if the 'activity_bill' exists.
		 */
		return activityBillModel.findOneById({id: params.activity_bill_id})
			.then((results) => {
				if (results.length == 0 || results[0].status == value.ACTIVITY_BILL_STATUS_FINISHED) {
					return {result: false};
				}

				return {result: true};
			});
	},

	/* params = {user_id, activity_bill_id} */
	/* results = {result}) */
	checkChallenge: (params) => {
		/*
		 a) check if the 'user' has created a 'challenge' to the 'activity_bill'
		 */
		return challengeModel.findOneByUserIdAndActivityBillId(params)
			.then((results) => {
				if (results.length == 0) {
					return {result: false};
				}

				return {result: true};
			});
	},
};

module.exports = checkingService;
