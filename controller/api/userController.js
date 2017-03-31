const express = require('express');
const bodyParser = require('body-parser');

const userService = require('../../service/userService');
const clubService = require('../../service/clubService');
const activityService = require('../../service/activityService');
const notificationService = require('../../service/notificationService');

const tokenAuthentication = require('../../middleware/tokenAuthentication');

const userRoute = express.Router();


userRoute.post('/register',
	bodyParser.urlencoded({extended: false}),
	(req, res, next) => {
		userService.createUser(req.body,
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success'});
				console.log("a new user registered, id: " + results.userId);
			}
		);
	}
);

userRoute.post('/log_in',
	bodyParser.urlencoded({extended: false}),
	(req, res, next) => {
		userService.logIn(req.body,
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user logged in, id: " + results.id);
			}
		);
	}
);

userRoute.get('/get_all_participated_activities',
	tokenAuthentication,
	(req, res, next) => {
		const params = {user_id: req.user.id};
		activityService.getAllParticipatedActivitiesByUserId(params,
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user got all participated activities (" + results.length + ") , id: " + req.user.id);
			}
		);
	}
);

userRoute.get('/get_all_sponsored_activities',
	tokenAuthentication,
	(req, res, next) => {
		const params = {user_id: req.user.id};
		activityService.getAllSponsoredActivitiesByUserId(params,
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user got all sponsored activities (" + results.length + ") , id: " + req.user.id);
			}
		);
	}
);

userRoute.get('/get_all_clubs',
	tokenAuthentication,
	(req, res, next) => {
		clubService.getAllClubsByUserId({user_id: req.user.id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user got all joined clubs (" + results.clubs.length + "), id: " + req.user.id);
			}
		);
	}
);

userRoute.get('/get_all_notifications',
	tokenAuthentication,
	(req, res, next) => {
		notificationService.getAllNotificationsByUserId({user_id: req.user.id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user got all notifications (" + results.notifications.length + "), id: " + req.user.id);
			}
		);
	}
);

module.exports = userRoute;
