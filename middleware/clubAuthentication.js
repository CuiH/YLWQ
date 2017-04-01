const clubModel = require('../model/clubModel');
const userClubMapModel = require('../model/userClubMapModel');

const value = require('../config/value');


const clubAuthentication = {
	/* check if the 'user' is an admin of the 'club', and if the 'club' exists */
	/* params = {user_id, club_id} */
	adminAccess: (req, res, next) => {
		userClubMapModel.findOneByUserIdAndClubId({
			user_id: req.user.id,
			club_id: req.body.club_id
		}, (err, results) => {
			if (err) {
				return next(err);
			}

			if (results.length == 0 || ![value.USER_CLUB_ROLE_ADMIN, value.USER_CLUB_ROLE_FOUNDER]
					.includes(results[0].role)) {
				return next(new Error("no access."));
			}

			next();
		});
	},

	/* check if the 'user' is a member of the 'club', and if the 'club' exists */
	/* params = {user_id, club_id} */
	memberAccess: (req, res, next) => {
		userClubMapModel.findOneByUserIdAndClubId({
			user_id: req.user.id,
			club_id: req.body ? req.body.club_id : req.query.club_id
		}, (err, results) => {
			if (err) {
				return next(err);
			}

			if (results.length == 0) {
				return next(new Error('no access.'));
			}

			next();
		});
	},

	/* check if the payer in all of the 'activity_bill_item' is a member of the 'club' that holds the 'activity'*/
	/* params = {activity_bill_item, activity_id} */
	payerAndParticipantMemberAccess: (req, res, next) => {
		userClubMapModel.findAllByActivityId({activity_id: req.body.activity_id}, (err, results) => {
			if (err) {
				return next(err);
			}

			let memberIds = [];
			for (let i = 0; i < results.length; i++) {
				memberIds.push(results[i].user_id);
			}

			const items = req.body.activity_bill_items;
			for (let i = 0; i < items.length; i++) {
				if (!memberIds.includes(items[i].payer_user_id)) {
					return next(new Error("invalid payer."));
				}
			}

			const payments = req.body.activity_bill_participant_payments;
			for (let i = 0; i < payments.length; i++) {
				if (!memberIds.includes(payments[i].participant_user_id)) {
					return next(new Error("invalid participant."));
				}
			}

			next();
		});
	},

	/* check if the 'club' exists */
	/* params = {club_id} */
	clubExistence: (req, res, next) => {
		clubModel.findOneById({id: req.body.club_id},
			(err, results) => {
				if (err) {
					return next(err);
				}

				if (results.length == 0) {
					return next(new Error("no such club."));
				}

				next();
			}
		);
	},

	/* check if the 'user' is not in the 'club' */
	/* params = {user_id, club_id} */
	memberExclusion: (req, res, next) => {
		userClubMapModel.findOneByUserIdAndClubId({user_id: req.user.id, club_id: req.body.club_id},
			(err, results) => {
				if (err) {
					return next(err);
				}

				if (results.length != 0) {
					return next(new Error("already in the club."));
				}

				next();
			}
		);
	},
};

module.exports = clubAuthentication;
