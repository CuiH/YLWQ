const express = require('express');
const bodyParser = require('body-parser');

const activityBillService = require('../../service/activityBillService');
const activityService = require('../../service/activityService');
const clubMessageService = require('../../service/clubMessageService');
const notificationService = require('../../service/notificationService');
const userService = require('../../service/userService');
const challengeService = require('../../service/challengeService');

const tokenAuthentication = require('../../middleware/tokenAuthentication');
const activityBillAuthentication = require('../../middleware/activityBillAuthentication');
const activityAuthentication = require('../../middleware/activityAuthentication');
const clubAuthentication = require('../../middleware/clubAuthentication');

const value = require('../../config/value');


const activityBillRoute = express.Router();

activityBillRoute.post('/create',
	tokenAuthentication,
	bodyParser.json(),
	activityAuthentication.finishedActivity,
	activityBillAuthentication.createAccess,
	activityBillAuthentication.unpublishedActivityBill,
	clubAuthentication.itemPayerMemberAccess,
	activityAuthentication.participantPaymentParticipantAccess,
	(req, res, next) => {
		let params = req.body;
		params.user_id = req.user.id;

		let activity = null;
		activityBillService.createActivityBill(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user published an activity_bill");

				return activityService.getActivityById({id: req.body.id});
			})
			.then((results) => {
				activity = results.activity;

				let clubMessageParams = {
					operator_user_id: req.user.id,
					club_id: activity.club_id,
					title: null,
					content: null,
					type: value.CLUB_MESSAGE_TYPE_ACTIVITY_BILL,
					target_id: activity.id,
					target_name: activity.name
				};

				return clubMessageService.createClubMessage(clubMessageParams);
			})
			.then(() => {
				console.log("a club_message was created.");
				return userService.getAllParticipantsByActivityId({activity_id: req.body.id});
			})
			.then((results) => {
				let notificationParams = {
					title: "活动账单提醒",
					content: null,
					type: value.NOTIFICATION_TYPE_ACTIVITY_BILL,
					object_id: null,
					object_name: null,
					subject_id: activity.id,
					subject_name: activity.name,
					receivers: results.participants,
				};

				return notificationService.sendMultipleNotifications(notificationParams);
			})
			.then(() => console.log("notifications were sent."))
			.catch(err => next(err));

	}
);

activityBillRoute.post('/update',
	tokenAuthentication,
	bodyParser.json(),
	activityBillAuthentication.publishedAndUnfinishedActivityBill,
	activityBillAuthentication.publisherAccess,
	activityBillAuthentication.itemsUpdateAccess,
	activityBillAuthentication.paymentsUpdateAccess,
	(req, res, next) => {
		let activity = null;
		activityBillService.updateActivityBillById(req.body)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user updated an activity_bill");

				return activityService.getActivityById({id: req.body.id});
			})
			.then((results) => {
				activity = results.activity;

				let clubMessageParams = {
					operator_user_id: req.user.id,
					club_id: activity.club_id,
					title: null,
					content: null,
					type: value.CLUB_MESSAGE_TYPE_ACTIVITY_BILL_UPDATE,
					target_id: activity.id,
					target_name: activity.name
				};

				return clubMessageService.createClubMessage(clubMessageParams);
			})
			.then(() => {
				console.log("a club_message was created.");
				return userService.getAllParticipantsByActivityId({activity_id: req.body.id});
			})
			.then((results) => {
				let notificationParams = {
					title: "活动账单更新提醒",
					content: null,
					type: value.NOTIFICATION_TYPE_ACTIVITY_BILL_UPDATE,
					object_id: null,
					object_name: null,
					subject_id: activity.id,
					subject_name: activity.name,
					receivers: results.participants,
				};

				return notificationService.sendMultipleNotifications(notificationParams);
			})
			.then(() => console.log("notifications were sent."))
			.catch(err => next(err));
	}
);

activityBillRoute.get('/get_all_challenges',
	tokenAuthentication,
	activityBillAuthentication.readAccess,
	(req, res, next) => {
		challengeService.getAllChallengesByActivityBillId({activity_bill_id: req.query.activity_bill_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got all challenges of an activity_bill.");
			})
			.catch(err => next(err));
	}
);

activityBillRoute.post('/finish',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	activityBillAuthentication.publishedAndUnfinishedActivityBill,
	activityBillAuthentication.publisherAccess,
	activityBillAuthentication.canFinish,
	(req, res, next) => {
		let activity = null;
		activityBillService.finishActivityBill({activity_bill_id: req.body.activity_bill_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user finished an activity_bill.");

				return activityService.getActivityById({id: req.body.activity_bill_id});
			})
			.then((results) => {
				activity = results.activity;

				let clubMessageParams = {
					operator_user_id: req.user.id,
					club_id: activity.club_id,
					title: null,
					content: null,
					type: value.CLUB_MESSAGE_TYPE_ACTIVITY_BILL_FINISH,
					target_id: activity.id,
					target_name: activity.name
				};

				return clubMessageService.createClubMessage(clubMessageParams);
			})
			.then(() => {
				console.log("a club_message was created.");
				return userService.getAllParticipantsByActivityId({activity_id: req.body.activity_bill_id});
			})
			.then((results) => {
				let notificationParams = {
					title: "活动账单结算提醒",
					content: null,
					type: value.NOTIFICATION_TYPE_ACTIVITY_BILL_FINISH,
					object_id: null,
					object_name: null,
					subject_id: activity.id,
					subject_name: activity.name,
					receivers: results.participants,
				};

				return notificationService.sendMultipleNotifications(notificationParams);
			})
			.then(() => console.log("notifications were sent."))
			.catch(err => next(err));
	}
);

activityBillRoute.get('/:activity_bill_id',
	tokenAuthentication,
	activityBillAuthentication.publishedActivityBill,
	activityBillAuthentication.readAccess,
	(req, res, next) => {
		const params = {id: req.params.activity_bill_id};
		activityBillService.getActivityBillById(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got an activity_bill");
			})
			.catch(err => next(err));
	}
);

module.exports = activityBillRoute;
