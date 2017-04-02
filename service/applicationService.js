const clubModel = require('../model/clubModel');
const applicationModel = require('../model/applicationModel');
const userClubMapModel = require('../model/userClubMapModel');

const value = require('../config/value');


const applicationService = {
	/* params = {applicant_user_id, club_id, message} */
	/* results = {applicationId} */
	createApplication: (params) => {
		/*
		 a) create a new 'application'
		 */
		return applicationModel.create(params)
			.then((result) => {
				return {applicationId: result.insertId};
			})
	},

	/* params = {id} */
	/* results = {application} */
	getApplicationById: (params) => {
		/*
		 a) get an 'application'
		 */
		return applicationModel.findOneByAId(params)
			.then((results) => {
				return {application: results[0]};
			})
	},

	/* params = {application_id, replier_user_id} */
	/* results = {} */
	acceptApplication: (params) => {
		/*
		 a) update the [status, replier_user_id, reply_time] of the 'application'
		 b) get the application (for its [applicant_user_id] and [club_id])
		 c) create a new 'user_club_map'
		 d) update the [member_number] in 'club'
		 */
		let application = null;
		return applicationModel.updateByAId({
			id: params.application_id,
			replier_user_id: params.replier_user_id,
			status: value.APPLICATION_STATUS_ACCEPTED
		}).then(() => {
			return applicationModel.findOneByAId({id: params.application_id});
		}).then((results) => {
			application = results[0];

			return userClubMapModel.create({
				user_id: application.applicant_user_id,
				club_id: application.club_id,
				role: value.USER_CLUB_ROLE_MEMBER
			});
		}).then(() => {
			return clubModel.increaseMemberNumberByOneById({id: application.club_id});
		}).then(() => {
			return {application: application};
		});
	},

	/* params = {application_id, replier_user_id} */
	/* results = {} */
	rejectApplication: (params) => {
		/*
		 a) update the [status, replier_user_id, reply_time] of the 'application'
		 */
		return applicationModel.updateByAId({
			id: params.application_id,
			replier_user_id: params.replier_user_id,
			status: value.APPLICATION_STATUS_REJECTED
		}).then(() => {
			return {};
		});
	}
};

module.exports = applicationService;
