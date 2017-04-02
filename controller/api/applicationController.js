const express = require('express');
const bodyParser = require('body-parser');

const applicationService = require('../../service/applicationService');
const notificationService = require('../../service/notificationService');
const userService = require('../../service/userService');
const clubService = require('../../service/clubService');
const clubMessageService = require('../../service/clubMessageService');


const tokenAuthentication = require('../../middleware/tokenAuthentication');
const clubAuthentication = require('../../middleware/clubAuthentication');
const applicationAuthentication = require('../../middleware/applicationAuthentication');

const value = require('../../config/value');


const applicationRoute = express.Router();

applicationRoute.post('/create',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	clubAuthentication.clubExistence,
	clubAuthentication.memberExclusion,
	applicationAuthentication.uniqueEntry,
	(req, res, next) => {
		let params = req.body;
		params.applicant_user_id = req.user.id;

		let applicationId = null;
		applicationService.createApplication(params)
			.then((results) => {
				applicationId = results.applicationId;

				return userService.getAllAdminsByClubId({club_id: req.body.club_id});
			})
			.then((results) => {
				let notificationParams = {
					title: "群系统消息",
					content: null,
					type: value.NOTIFICATION_TYPE_APPLICATION,
					object_id: applicationId,
					object_name: null,
					subject_id: null,
					subject_name: null,
					receivers: results.admins,
				};

				return notificationService.sendMultipleNotifications(notificationParams);
			})
			.then(() => {
				res.json({result: 'success', data: {applicationId: applicationId}});
				console.log("a user created an application, and notifications were sent");
			})
			.catch(err => next(err));
	}
);

applicationRoute.post('/accept',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	applicationAuthentication.readAccess,
	applicationAuthentication.unhandledApplication,
	(req, res, next) => {
		let application = null;
		applicationService.acceptApplication({replier_user_id: req.user.id, application_id: req.body.application_id})
			.then((results) => {
				application = results.application;

				res.json({result: 'success'});
				console.log("a user accepted an application.");

				let clubMessageParams = {
					operator_user_id: req.user.id,
					club_id: application.club_id,
					title: null,
					content: null,
					type: value.CLUB_MESSAGE_TYPE_ENROLLMENT,
					target_id: application.applicant_user_id,
					target_name: application.applicant_username
				};

				return clubMessageService.createClubMessage(clubMessageParams);
			})
			.then(() => {
				console.log("a club_message was created.");

				return clubService.getClubById({id: application.club_id});
			})
			.then((results) => {
				let notificationParams = {
					title: "群系统消息",
					content: null,
					type: value.NOTIFICATION_TYPE_JOIN_CLUB,
					object_id: results.club.id,
					object_name: results.club.name,
					subject_id: null,
					subject_name: null,
					receiver_user_id: application.applicant_user_id,
				};

				return notificationService.sendNotification(notificationParams);
			})
			.then(() => {
				console.log("a notification was sent.");
			})
			.catch(err => next(err));
	}
);

applicationRoute.post('/reject',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	applicationAuthentication.readAccess,
	applicationAuthentication.unhandledApplication,
	(req, res, next) => {
		let application = null;
		applicationService.rejectApplication({replier_user_id: req.user.id, application_id: req.body.application_id})
			.then(() => {
				res.json({result: 'success'});
				console.log("a user rejected an application.");

				return applicationService.getApplicationById({id: req.body.application_id});
			})
			.then((results) => {
				application = results.application;

				return clubService.getClubById({id: application.club_id});
			})
			.then((results) => {
				let notificationParams = {
					title: "群系统消息",
					content: null,
					type: value.NOTIFICATION_TYPE_APPLICATION_REJECTION,
					object_id: results.club.id,
					object_name: results.club.name,
					subject_id: null,
					subject_name: null,
					receiver_user_id: application.applicant_user_id,
				};
				notificationService.sendNotification(notificationParams);
			})
			.then(() => {
				console.log("a notification was sent.");
			})
			.catch(err => next(err));
	}
);

applicationRoute.get('/:application_id',
	tokenAuthentication,
	applicationAuthentication.readAccess,
	(req, res, next) => {
		applicationService.getApplicationById({id: req.params.application_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got an application.");
			})
			.catch(err => next(err));
	}
);

module.exports = applicationRoute;
