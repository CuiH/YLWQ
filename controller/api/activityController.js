const express = require('express');
const bodyParser = require('body-parser');

const activityService = require('../../service/activityService');
const userService = require('../../service/userService');
const clubService = require('../../service/clubService');
const notificationService = require('../../service/notificationService');

const clubAuthentication = require('../../middleware/clubAuthentication');
const activityAuthentication = require('../../middleware/activityAuthentication');
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
					target_name: null
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
					object_name: null,
					subject_id: club.id,
					subject_name: club.name,
					receivers: results.members,
				};

				return notificationService.sendMultipleNotifications(notificationParams);
			})
			.then(() => {
				console.log("notifications were sent.");
			})
			.catch(err => next(err));
	}
);

activityRoute.post('/attend',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	activityAuthentication.readAccess,
	(req, res, next) => {
		let params = req.body;
		params.user_id = req.user.id;
		activityService.attendActivity(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user attended an activity.");
			})
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

activityRoute.get('/:activity_id',
	tokenAuthentication,
	activityAuthentication.readAccess,
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
