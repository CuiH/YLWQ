const applicationModel = require('../model/applicationModel');
const userClubMapModel = require('../model/userClubMapModel');

const value = require('../config/value');


const applicationAuthentication = {
	/* check if the 'user' has sent an UNHANDLED 'application' to the 'club' */
	/* params = {applicant_user_id, club_id} */
	uniqueEntry: (req, res, next) => {
		applicationModel.findAllByApplicantUserIdAndClubIdAndStatus({
			applicant_user_id: req.user.id,
			club_id: req.body.club_id,
			status: value.APPLICATION_STATUS_UNHANDLED
		}).then((results) => {
			if (results.length != 0) {
				return next(new Error("has already sent an application."));
			}

			next();
		}).catch(err => next(err));
	},

	/* check whether the user is an admin of the club that the application is sent to, and if the application exists */
	/* params = {user_id, application_id} */
	readAccess: (req, res, next) => {
		userClubMapModel.findOneByUserIdAndApplicationId({
			user_id: req.user.id,
			application_id: req.params.application_id ?  req.params.application_id : req.body.application_id,
		}).then((results) => {
			if (results.length == 0 || ![value.USER_CLUB_ROLE_ADMIN, value.USER_CLUB_ROLE_FOUNDER]
					.includes(results[0].role)) {
				return next(new Error("no access."));
			}

			next();
		}).catch(err => next(err));
	},

	/* check if the application is unhandled */
	/* params = {application_id} */
	unhandledApplication: (req, res, next) => {
		applicationModel.findOneByAId({id: req.body.application_id})
			.then((results) => {
				if (results[0].status != value.APPLICATION_STATUS_UNHANDLED) {
					return next(new Error("has been handled."));
				}

				next();
			}).catch(err => next(err));
	},
};

module.exports = applicationAuthentication;
