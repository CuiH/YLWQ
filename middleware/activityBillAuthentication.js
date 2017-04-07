const clubModel = require('../model/clubModel');
const userActivityMapModel = require('../model/userActivityMapModel');
const userClubMapModel = require('../model/userClubMapModel');
const activityBillItemModel = require('../model/activityBillItemModel');
const activityBillParticipantPaymentModel = require('../model/activityBillParticipantPaymentModel');
const activityModel = require('../model/activityModel');
const activityBillModel = require('../model/activityBillModel');
const challengeModel = require('../model/challengeModel');

const value = require('../config/value');


const activityBillAuthentication = {
	/* check if the 'user' is a participant or the sponsor of the 'activity', or a member of the 'club' that holds the 'activity', and if the 'activity' exists */
	/* params = {user_id, activity_bill_id} */
	readAccess: (req, res, next) => {
		activityModel.findOneById({
			id: req.params.activity_bill_id || req.params.activity_id || req.query.activity_id || req.query.activity_bill_id
		}).then((results) => {
			if (results.length == 0) {
				return Promise.reject(new Error('no such activity'));
			}
			if (results[0].sponsor_user_id == req.user.id) {
				return Promise.reject(1);
			}

			return userActivityMapModel.findOneByUserIdAndActivityId({
				user_id: req.user.id,
				activity_id: req.params.activity_bill_id || req.params.activity_id || req.query.activity_bill_id
			});
		}).then((results) => {
			if (results.length != 0) {
				return Promise.reject(1);
			}

			return userClubMapModel.findOneByUserIdAndActivityId({
				user_id: req.user.id,
				activity_id: req.params.activity_bill_id || req.params.activity_id || req.query.activity_bill_id
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

	/* check if the 'activity_bill' is created by the operator */
	/* params = {id} */
	publisherAccess: (req, res, next) => {
		activityBillModel.findOneById({id: req.body.id || req.body.activity_bill_id})
			.then((results) => {
				if (results[0].publisher_user_id != req.user.id) {
					return next(new Error('no access.'));
				}

				next();
			})
			.catch((err) => next(err));
	},

	/* check if the 'activity_bill_item' is valid */
	/* params = {activity_id} */
	itemsUpdateAccess: (req, res, next) => {
		userClubMapModel.findAllByActivityId({activity_id: req.body.id})
			.then((results) => {
				// + & update: payer is a member of the 'club' that holds the 'activity'
				let memberIds = [];
				for (let i = 0; i < results.length; i++) {
					memberIds.push(results[i].user_id);
				}

				const items = req.body.activityBillItems;
				for (let i = 0; i < items.length; i++) {
					if (items[i].flag == 0 || items[i].flag == 1) {
						if (!memberIds.includes(items[i].payer_user_id)) {
							return Promise.reject(new Error("invalid payer."));
						}
					}
				}

				return activityBillItemModel.findAllByActivityBillId({activity_bill_id: req.body.id});
			})
			.then((results) => {
				// - & update: the 'activity_bill_item' belongs to this 'activity_bill'
				let itemIds = [];
				for (let i = 0; i < results.length; i++) {
					itemIds.push(results[i].id);
				}

				const items = req.body.activityBillItems;
				for (let i = 0; i < items.length; i++) {
					if (items[i].flag == 1 || items[i].flag == 2) {
						if (!itemIds.includes(items[i].id)) {
							return next(new Error("invalid item."));
						}
					}
				}

				next();
			})
			.catch(err => next(err));
	},

	/* check if the 'activity_bill_participant_payment' is valid */
	/* params = {activity_bill_id} */
	paymentsUpdateAccess: (req, res, next) => {
		activityBillParticipantPaymentModel.findAllByActivityBillId({activity_bill_id: req.body.id})
			.then((results) => {
				// update: the 'activity_bill_participant_payment' belongs to this 'activity_bill'
				let paymentIds = [];
				for (let i = 0; i < results.length; i++) {
					paymentIds.push(results[i].id);
				}

				const payments = req.body.activityBillParticipantPayments;
				for (let i = 0; i < payments.length; i++) {
					if (!paymentIds.includes(payments[i].id)) {
						return next(new Error("invalid payment."));

					}
				}

				next();
			})
			.catch((err) => next(err));
	},

	/* check if the 'activity_bill' is created, and if the 'status' is not FINISHED, and if the 'activity_bill' exists */
	/* params = {activity_bill_id} */
	publishedAndUnfinishedActivityBill: (req, res, next) => {
		activityBillModel.findOneById({id: req.body.id || req.body.activity_bill_id})
			.then((results) => {
				if (results.length == 0 || results[0].status == value.ACTIVITY_BILL_STATUS_FINISHED) {
					return next(new Error('invalid activity_bill.'));
				}

				next();
			})
			.catch((err) => next(err));
	},

	/* check if the 'activity_bill' has no 'challenge', and one day after [last_modify_time] */
	/* params = {activity_bill_id} */
	canFinish: (req, res, next) => {
		challengeModel.findAllByActivityBillId({activity_bill_id: req.body.activity_bill_id})
			.then((results) => {
				if (results.length != 0) {
					return Promise.reject(new Error('cannot do this.'));
				}

				return activityBillModel.findOneById({id: req.body.activity_bill_id});
			})
			.then((results) => {
				let lastModifyTime = new Date(Date.parse(results[0].last_modify_time));
				if (new Date().getTime() - lastModifyTime.getTime() < 86400000) {
					return next(new Error('cannot do this.'));
				}

				next();
			})
			.catch((err) => next(err));
	},
};

module.exports = activityBillAuthentication;
