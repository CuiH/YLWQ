const clubModel = require('../model/clubModel');
const userClubMapModel = require('../model/userClubMapModel');
const activityModel = require('../model/activityModel');
const userActivityMapModel = require('../model/userActivityMapModel');

const value = require('../config/value');


const activityAuthentication = {
	/* check if the 'user' is a member of the 'club' that holds the 'activity', and if the 'activity' exists */
	/* params = {user_id, activity_id} */
	readAccess: (req, res, next) => {
		userClubMapModel.findOneByUserIdAndActivityId({
			user_id: req.user.id,
			activity_id: req.body ? req.body.activity_id : (req.query.activity_id || req.params.activity_id)
		}).then((results) => {
			if (results.length == 0) {
				return next(new Error('no access.'));
			}

			next();
		}).catch(err => next(err));
	},

	/* check if the 'user' is the sponsor of the 'activity', and if the 'activity' exists */
	/* params = {user_id, activity_bill_id} */
	sponsorAccess: (req, res, next) => {
		activityModel.findOneById({
				id: req.body.activity_bill_id || req.body.activity_id
			}, (err, results) => {
				if (err) {
					return next(err);
				}

				if (results.length == 0 || results[0].sponsor_user_id != req.user.id) {
					return next(new Error('no access.'));
				}

				next();
			}
		);
	},

	/* check if the user in all of the 'activity_bill_participant_payment' is a participant of the 'activity' */
	/* params = {activityBillParticipantPayments, activity_id} */
	participantPaymentParticipantAccess: (req, res, next) => {
		userActivityMapModel.findAllByActivityId({activity_id: req.body.activity_id})
			.then((results) => {
				let participantIds = [];
				for (let i = 0; i < results.length; i++) {
					participantIds.push(results[i].user_id);
				}

				const items = req.body.activityBillParticipantPayments;
				for (let i = 0; i < items.length; i++) {
					if (!participantIds.includes(items[i].participant_user_id)) {
						return next(new Error("invalid participant payment participant."));
					}
				}

				next();
			})
			.catch(err => next(err));
	},
};

module.exports = activityAuthentication;
