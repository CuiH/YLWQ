const clubModel = require('../model/clubModel');
const userClubMapModel = require('../model/userClubMapModel');
const activityModel = require('../model/activityModel');

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
};

module.exports = activityAuthentication;
