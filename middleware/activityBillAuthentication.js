const clubModel = require('../model/clubModel');
const userActivityMapModel = require('../model/userActivityMapModel');
const userClubMapModel = require('../model/userClubMapModel');
const activityModel = require('../model/activityModel');
const activityBillModel = require('../model/activityBillModel');

const value = require('../config/value');


const activityBillAuthentication = {
	/* check if the 'user' is a participant or the sponsor of the 'activity', or a member of the 'club' that holds the 'activity', and if the 'activity' exists */
	/* params = {user_id, activity_bill_id} */
	readAccess: (req, res, next) => {
		activityModel.findOneById({
			id: req.params.activity_bill_id || req.params.activity_id
		}).then((results) => {
			if (results.length == 0) {
				return Promise.reject(new Error('no such activity'));
			}
			if (results[0].sponsor_user_id == req.user.id) {
				return Promise.reject(1);
			}

			return userActivityMapModel.findOneByUserIdAndActivityId({
				user_id: req.user.id,
				activity_id: req.params.activity_bill_id || req.params.activity_id
			});
		}).then((results) => {
			if (results.length != 0) {
				return Promise.reject(1);
			}

			return userClubMapModel.findOneByUserIdAndActivityId({
				user_id: req.user.id,
				activity_id: req.params.activity_bill_id || req.params.activity_id
			});
		}).then((results) => {
			if (results.length == 0) {
				return next(new Error('no access.'));
			}

			next();
		}).catch((err) => {
			if (err instanceof Error) {
				next(err);
			} else {
				next();
			}
		});
	},

	/* check if the 'user' is the sponsor of the 'activity', or the founder of the 'club' that holds  the 'activity', and if the 'activity' exists */
	/* params = {user_id, activity_id} */
	createAccess: (req, res, next) => {
		activityModel.findOneById({id: req.body.id})
			.then((results) => {
				if (results.length == 0) {
					return Promise.reject(new Error('no such activity.'));
				}

				if (results[0].sponsor_user_id == req.user.id) {
					return Promise.reject(1);
				}

				return userClubMapModel.findOneByUserIdAndActivityId({user_id: req.user.id, activity_id: req.body.id});
			})
			.then((results) => {
				if (results.length == 0 || ![value.USER_CLUB_ROLE_ADMIN, value.USER_CLUB_ROLE_FOUNDER].includes(results[0].role)) {
					return next(new Error("no access."));
				}

				next();
			})
			.catch((err) => {
				if (err instanceof Error) {
					next(err);
				} else {
					next();
				}
			});
	},

	/* check if the 'activity_bill' is created, and if the 'activity_bill' exists */
	/* params = {activity_bill_id} */
	publishedActivityBill: (req, res, next) => {
		activityBillModel.findOneById({id: req.params.activity_bill_id})
			.then((results) => {
				if (results.length == 0) {
					return next(new Error('has not been published.'));
				}

				next();
			})
			.catch((err) => next(err));
	},

	/* check if the 'activity_bill' is not created */
	/* params = {activity_id} */
	unpublishedActivityBill: (req, res, next) => {
		activityBillModel.findOneById({id: req.body.id})
			.then((results) => {
				if (results.length != 0) {
					return next(new Error('has been published.'));
				}

				next();
			})
			.catch((err) => next(err));
	},
};

module.exports = activityBillAuthentication;
