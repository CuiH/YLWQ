/**
 * Created by CuiH on 2017/4/6.
 */

const express = require('express');
const bodyParser = require('body-parser');

const challengeService = require('../../service/challengeService');
const activityService = require('../../service/activityService');
const activityBillService = require('../../service/activityBillService');
const notificationService = require('../../service/notificationService');

const tokenAuthentication = require('../../middleware/tokenAuthentication');
const activityAuthentication = require('../../middleware/activityAuthentication');
const challengeAuthentication = require('../../middleware/challengeAuthentication');
const activityBillAuthentication = require('../../middleware/activityBillAuthentication');

const value = require('../../config/value');


const challengeRoute = express.Router();

challengeRoute.post('/create',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	activityAuthentication.participantAccess,
	activityBillAuthentication.publishedAndUnfinishedActivityBill,
	(req, res, next) => {
		let params = req.body;
		params.challenger_user_id = req.user.id;

		let activity = null;
		challengeService.createChallenge(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user challenged a activity_bill.");

				return activityService.getActivityById({id: req.body.activity_bill_id});
			})
			.then((result) => {
				activity = result.activity;

				return activityBillService.getActivityBillById2({id: req.body.activity_bill_id});
			})
			.then((result) => {
				let notificationParams = {
					title: "活动账单收到质疑",
					content: null,
					type: value.NOTIFICATION_TYPE_ACTIVITY_BILL_CHALLENGE,
					object_id: null,
					object_name: null,
					subject_id: activity.id,
					subject_name: activity.name,
					receiver_user_id: result.activityBill.publisher_user_id,
				};

				return notificationService.sendNotification(notificationParams);
			})
			.then(() => console.log("a notification was sent."))
			.catch(err => next(err));
	}
);

challengeRoute.post('/delete',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	challengeAuthentication.deleteAccess,
	(req, res, next) => {
		challengeService.deleteChallengeById({id: req.body.challenge_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user deleted a challenge.");
			})
			.catch(err => next(err));
	}
);

module.exports = challengeRoute;

