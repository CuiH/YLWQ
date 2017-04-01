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
		const params = req.body;
		params.applicant_user_id = req.user.id;
		applicationService.createApplication(params,
			(err, results) => {
				if (err) {
					return next(err);
				}

				req.applicationId = results.applicationId;
				console.log("a user created an application (" + results.applicationId + "), id: " + params.applicant_user_id);
				next();
			}
		);
	},
	(req, res, next) => {
		userService.getAllAdminsByClubId({club_id: req.body.club_id},
			(err, results) => {
				if (err) {
					return next(err);
				}

				req.admins = results.admins;
				next();
			}
		);
	},
	(req, res, next) => {
		let params = {
			title: "群系统消息",
			content: null,
			type: value.NOTIFICATION_TYPE_APPLICATION,
			object_id: req.applicationId,
			object_name: null,
			subject_id: null,
			subject_name: null,
			receivers: req.admins,
		};
		notificationService.sendMultipleNotifications(params,
			(err, results) => {
				if (err) {
					return next(err);
				}

				res.json({result: 'success'});
			}
		);
	}
);

applicationRoute.post('/accept',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	applicationAuthentication.readAccess,
	applicationAuthentication.unhandledApplication,
	(req, res, next) => {
		applicationService.acceptApplication({replier_user_id: req.user.id, application_id: req.body.application_id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success'});
				console.log("a user accepted an application (" + req.body.application_id + "), id: " + req.user.id);
				next();
			}
		);
	},
	(req, res, next) => {
		applicationService.getApplicationById({id: req.body.application_id},
			(err, results) => {
				if (err) {
					return console.log(err);
				}

				req.application = results.application;
				next();
			}
		);
	},
	(req, res, next) => {
		let params = {
			operator_user_id: req.user.id,
			club_id: req.application.club_id,
			title: null,
			content: null,
			type: value.CLUB_MESSAGE_TYPE_ENROLLMENT,
			target_id: req.application.applicant_user_id,
			target_name: req.application.applicant_username
		};
		clubMessageService.createClubMessage(params,
			(err, results) => {
				if (err) {
					return console.log(err);
				}

				next();
			}
		);
	},
	(req, res, next) => {
		clubService.getClubById({id: req.application.club_id},
			(err, results) => {
				if (err) {
					return console.log(err);
				}

				req.club = results.club;
				next();
			}
		);
	},
	(req, res, next) => {
		let params = {
			title: "群系统消息",
			content: null,
			type: value.NOTIFICATION_TYPE_JOIN_CLUB,
			object_id: req.club.id,
			object_name: req.club.name,
			subject_id: null,
			subject_name: null,
			receiver_user_id: req.application.applicant_user_id,
		};
		notificationService.sendNotification(params,
			(err, results) => {
				if (err) {
					return console.log(err);
				}
			}
		);
	}
);

applicationRoute.post('/reject',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	applicationAuthentication.readAccess,
	applicationAuthentication.unhandledApplication,
	(req, res, next) => {
		applicationService.rejectApplication({replier_user_id: req.user.id, application_id: req.body.application_id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success'});
				console.log("a user rejected an application (" + req.query.application_id + "), id: " + req.user.id);
				next();
			}
		);
	},
	(req, res, next) => {
		applicationService.getApplicationById({id: req.body.application_id},
			(err, results) => {
				if (err) {
					return console.log(err);
				}

				req.application = results.application;
				next();
			}
		);
	},
	(req, res, next) => {
		clubService.getClubById({id: req.application.club_id},
			(err, results) => {
				if (err) {
					return console.log(err);
				}

				req.club = results.club;
				next();
			}
		);
	},
	(req, res, next) => {
		let params = {
			title: "群系统消息",
			content: null,
			type: value.NOTIFICATION_TYPE_APPLICATION_REJECTION,
			object_id: req.club.id,
			object_name: req.club.name,
			subject_id: null,
			subject_name: null,
			receiver_user_id: req.application.applicant_user_id,
		};
		notificationService.sendNotification(params,
			(err, results) => {
				if (err) {
					return console.log(err);
				}
			}
		);
	}
);

applicationRoute.get('/:application_id',
	tokenAuthentication,
	applicationAuthentication.readAccess,
	(req, res, next) => {
		applicationService.getApplicationById({id: req.params.application_id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user get an application (" + req.params.application_id + "), id: " + req.user.id);
			}
		);
	}
);

module.exports = applicationRoute;
