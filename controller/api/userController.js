const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const userService = require('../../service/userService');
const clubService = require('../../service/clubService');
const activityService = require('../../service/activityService');
const notificationService = require('../../service/notificationService');

const tokenAuthentication = require('../../middleware/tokenAuthentication');

const userRoute = express.Router();


userRoute.post('/register',
	bodyParser.urlencoded({extended: false}),
	(req, res, next) => {
		userService.createUser(req.body)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a new user registered.");
			})
			.catch(err => next(err));
	}
);

userRoute.post('/log_in',
	bodyParser.urlencoded({extended: false}),
	(req, res, next) => {
		userService.logIn(req.body)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user logged in.");
			})
			.catch(err => next(err));

	}
);

userRoute.get('/get_all_participated_activities',
	tokenAuthentication,
	(req, res, next) => {
		const params = {user_id: req.user.id};
		activityService.getAllParticipatedActivitiesByUserId(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got all participated activities.");
			})
			.catch(err => next(err));
	}
);

userRoute.get('/get_all_sponsored_activities',
	tokenAuthentication,
	(req, res, next) => {
		const params = {user_id: req.user.id};
		activityService.getAllSponsoredActivitiesByUserId(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got all sponsored activities.");
			})
			.catch(err => next(err));
	}
);

userRoute.get('/get_all_clubs',
	tokenAuthentication,
	(req, res, next) => {
		clubService.getAllClubsByUserId({user_id: req.user.id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got all joined clubs.");
			})
			.catch(err => next(err));
	}
);

userRoute.get('/get_all_notifications',
	tokenAuthentication,
	(req, res, next) => {
		notificationService.getAllNotificationsByUserId({user_id: req.user.id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got all notifications.");
			})
			.catch(err => next(err));
	}
);

module.exports = userRoute;
