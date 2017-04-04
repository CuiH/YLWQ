const express = require('express');
const bodyParser = require('body-parser');

const activityService = require('../../service/activityService');
const userService = require('../../service/userService');
const clubService = require('../../service/clubService');
const notificationService = require('../../service/notificationService');

const clubAuthentication = require('../../middleware/clubAuthentication');
const activityAuthentication = require('../../middleware/activityAuthentication');
const activityBillAuthentication = require('../../middleware/activityBillAuthentication');
const clubMessageService = require('../../service/clubMessageService');
const tokenAuthentication = require('../../middleware/tokenAuthentication');

const value = require('../../config/value');


const activityRoute = express.Router();

activityRoute.post('/create',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	clubAuthentication.memberAccess,
	(req, res, next) => {
		let params = req.body;
		params.sponsor_user_id = req.user.id;

		let club = null;
		let activityId = null;
		activityService.createActivity(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user created an activity.");

				activityId = results.activityId;

				let clubMessageParams = {
					operator_user_id: req.user.id,
					club_id: req.body.club_id,
					title: null,
					content: null,
					type: value.CLUB_MESSAGE_TYPE_ACTIVITY,
					target_id: results.activityId,
					target_name: req.body.name
				};

				return clubMessageService.createClubMessage(clubMessageParams);
			})
			.then(() => {
				console.log("a club message was created.");

				return clubService.getClubById({id: req.body.club_id});
			})
			.then((results) => {
				club = results.club;

				return userService.getAllMembersByClubId({club_id: req.body.club_id});
			})
			.then((results) => {
				let notificationParams = {
					title: "新活动提醒",
					content: null,
					type: value.NOTIFICATION_TYPE_ACTIVITY_CREATION,
					object_id: activityId,
					object_name: req.body.name,
					subject_id: club.id,
					subject_name: club.name,
					receivers: results.members,
				};

				return notificationService.sendMultipleNotifications(notificationParams);
			})
			.then(() => console.log("notifications were sent."))
			.catch(err => next(err));
	}
);

activityRoute.post('/attend',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	activityAuthentication.readAccess,
	activityAuthentication.unfinishedActivity,
	(req, res, next) => {
		let params = req.body;
		params.user_id = req.user.id;
		activityService.attendActivity(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user attended an activity.");

				return activityService.getActivityById({id: req.body.activity_id});
			})
			.then((results) => {
				let notificationParams = {
					title: "参加活动提醒",
					content: null,
					type: value.NOTIFICATION_TYPE_ACTIVITY_ATTENDANCE,
					object_id: results.activity.id,
					object_name: results.activity.name,
					subject_id: null,
					subject_name: null,
					receiver_user_id: req.user.id,
				};

				return notificationService.sendNotification(notificationParams);
			})
			.then(() => console.log("a notification was sent."))
			.catch(err => next(err));
	}
);

activityRoute.get('/get_all_participants',
	tokenAuthentication,
	activityAuthentication.readAccess,
	(req, res, next) => {
		let params = {activity_id: req.query.activity_id};
		userService.getAllParticipantsByActivityId(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got all participants of an activity.");
			})
			.catch(err => next(err));
	}
);

activityRoute.post('/update',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	activityAuthentication.sponsorAccess,
	activityAuthentication.unfinishedActivity,
	(req, res, next) => {
		let activity = null;
		activityService.updateActivityById(req.body)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user updated an activity.");

				return activityService.getActivityById({id: req.body.id});
			})
			.then((results) => {
				activity = results.activity;

				let clubMessageParams = {
					operator_user_id: req.user.id,
					club_id: activity.club_id,
					title: null,
					content: null,
					type: value.CLUB_MESSAGE_TYPE_ACTIVITY_UPDATE,
					target_id: activity.id,
					target_name: activity.name
				};

				return clubMessageService.createClubMessage(clubMessageParams);
			})
			.then(() => {
				console.log("a club_message was created.");

				return userService.getAllParticipantsByActivityId({activity_id: activity.id});
			})
			.then((results) => {
				let notificationParams = {
					title: "活动更新提醒",
					content: null,
					type: value.NOTIFICATION_TYPE_ACTIVITY_UPDATE,
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

activityRoute.get('/:activity_id',
	tokenAuthentication,
	activityBillAuthentication.readAccess,
	(req, res, next) => {
		let params = {id: req.params.activity_id};
		activityService.getActivityById(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got an activity.");
			})
			.catch(err => next(err));
	}
);

module.exports = activityRoute;
