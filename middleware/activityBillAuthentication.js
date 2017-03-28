const clubModel = require('../model/clubModel');
const userActivityMapModel = require('../model/userActivityMapModel');
const activityModel = require('../model/activityModel');
const activityBillModel = require('../model/activityBillModel');

const value = require('../config/value');


/* check if the 'user' is a participant of the 'activity' */
/* params = {user_id, activity_id} */
const generateFindUserActivityMapPromise = (params) => {
	return new Promise((resolve, reject) => {
		userActivityMapModel.findOneByUserIdAndActivityId(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				if (results.length != 0) {
					return resolve(1);
				}

				resolve(0);
			}
		);
	});
};

/* check if the 'user' is the sponsor of the 'activity' */
/* params = {activity_id, user_id} */
const generateFindActivityPromise = (params) => {
	return new Promise((resolve, reject) => {
		activityModel.findOneById({id: params.activity_id},
			(err, results) => {
				if (err) {
					return reject(err);
				}

				if (results.length != 0 && results[0].sponsor_user_id == params.user_id) {
					return resolve(1);
				}

				resolve(0);
			}
		);
	});
};


const activityBillAuthentication = {
	/* check if the 'user' is a participant or the sponsor of the 'activity', and if the 'activity' exists */
	/* params = {user_id, activity_bill_id} */
	readAccess: (req, res, next) => {
		generateFindUserActivityMapPromise({
			user_id: req.user.id,
			activity_id: req.params.activity_bill_id
		}).then((result) => {
			if (result == 1) {
				return Promise.resolve(1);
			}

			return generateFindActivityPromise({
				user_id: req.user.id,
				activity_id: req.params.activity_bill_id
			});
		}).then((result) => {
			if (result == 1) return next();

			return next(new Error('no access.'));
		}).catch((err) => {
			return next(err);
		});
	},

	/* check if the 'activity_bill' is created, and if the 'activity_bill' exists */
	/* params = {activity_bill_id} */
	publishedActivityBill: (req, res, next) => {
		activityBillModel.findOneById({
			id: req.params.activity_bill_id || req.body.activity_bill_id
		}, (err, results) => {
			if (err) {
				return next(err);
			}

			if (results.length == 0 || results[0].status == value.ACTIVITY_BILL_STATUS_UNPUBLISHED) {
				return next(new Error('has not been published.'));
			}

			next();
		});
	},

	/* check if the 'activity_bill' is not created */
	/* params = {activity_bill_id} */
	unpublishedActivityBill: (req, res, next) => {
		activityBillModel.findOneById({
			id: req.body.activity_id
		}, (err, results) => {
			if (err) {
				return next(err);
			}

			if (results.length != 0) {
				return next(new Error('has been published.'));
			}

			next();
		});
	},
};

module.exports = activityBillAuthentication;
