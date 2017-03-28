const express = require('express');
const bodyParser = require('body-parser');

const applicationService = require('../../service/applicationService');
const notificationService = require('../../service/notificationService');
const userService = require('../../service/userService');

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
					// TODO handle error
					return next(err);
				}

				req.applicationId = results.applicationId;
				console.log("a user created an application (" + results.applicationId + "), id: " + params.applicant_user_id);
				next();
			}
		);
	},
	(req, res, next) => {
		userService.getAllAdminsByClubId(req.body,
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				req.admins = results.admins;
				next();
			}
		);
	},
	(req, res, next) => {
		let params = {
			title: null,
			content: null,
			type: value.NOTIFICATION_TYPE_APPLICATION,
			target_id: req.applicationId,
			target_name: null,
			receivers: req.admins,
		};
		notificationService.sendMultipleNotifications(params,
			(err, results) => {
				if (err) {
					// TODO handle error
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
