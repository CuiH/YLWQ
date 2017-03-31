const express = require('express');
const bodyParser = require('body-parser');

const activityService = require('../../service/activityService');
const userService = require('../../service/userService');

const clubAuthentication = require('../../middleware/clubAuthentication');
const activityAuthentication = require('../../middleware/activityAuthentication');
const clubMessageService = require('../../service/clubMessageService');
const tokenAuthentication = require('../../middleware/tokenAuthentication');

const value = require('../../config/value');


const activityRoute = express.Router();

activityRoute.post('/create',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	clubAuthentication.adminAccess,
	(req, res, next) => {
		const params = req.body;
		params.sponsor_user_id = req.user.id;
		activityService.createActivity(params,
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				req.activityId = results.activityId;
				res.json({result: 'success'});
				console.log("a user created an activity (" + results.activityId + "), id: " + params.sponsor_user_id);
				next();
			}
		);
	},
	(req, res, next) => {
		let params = {
			operator_user_id: req.user.id,
			club_id: req.body.club_id,
			title: null,
			content: null,
			type: value.CLUB_MESSAGE_TYPE_ACTIVITY,
			target_id: req.activityId,
			target_name: null
		};
		clubMessageService.createClubMessage(params,
			(err, results) => {
				if (err) {
					console.log()
				}

				res.json({result: 'success'});
			}
		);
	}
);

activityRoute.post('/attend',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	activityAuthentication.readAccess,
	(req, res, next) => {
		const params = req.body;
		params.user_id = req.user.id;
		activityService.attendActivity(params,
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success'});
				console.log("a user attended an activity (" + params.activity_id + ") , id: " + params.user_id);
			}
		);
	}
);

activityRoute.get('/get_all_participants',
	tokenAuthentication,
	activityAuthentication.readAccess,
	(req, res, next) => {
		const params = {activity_id: req.query.activity_id};
		userService.getAllParticipantsByActivityId(params,
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user got all participants of an activity (" + params.activity_id + ") , id: " + req.user.id);
			}
		);
	}
);

activityRoute.get('/:activity_id',
	tokenAuthentication,
	activityAuthentication.readAccess,
	(req, res, next) => {
		const params = {id: req.params.activity_id};
		activityService.getActivityById(params,
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user queried an activity (" + params.activity_id + ") , id: " + req.user.id);
			}
		);
	}
);

module.exports = activityRoute;
