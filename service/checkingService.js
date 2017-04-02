const userClubMapModel = require('../model/userClubMapModel');
const applicationModel = require('../model/applicationModel');
const userActivityMapModel = require('../model/userActivityMapModel');

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

	/* params = {user_id, club_id} */
	/* results = {result}) */
	checkApplicationUnread: (params) => {
		/*
		 a) check whether the has sent an unread 'application' to the 'club'
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
};

module.exports = checkingService;
