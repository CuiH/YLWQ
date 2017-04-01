const express = require('express');
const bodyParser = require('body-parser');

const clubService = require('../../service/clubService');
const userService = require('../../service/userService');
const activityService = require('../../service/activityService');
const clubMessageService = require('../../service/clubMessageService');
const clubBulletinService = require('../../service/clubBulletinService');
const notificationService = require('../../service/notificationService');

const tokenAuthentication = require('../../middleware/tokenAuthentication');
const clubAuthentication = require('../../middleware/clubAuthentication');

const value = require('../../config/value');


const clubRoute = express.Router();

clubRoute.post('/create',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	(req, res, next) => {
		let params = req.body;
		params.founder_user_id = req.user.id;
		clubService.createClub(params,
			(err, results) => {
				if (err) {
					return next(err);
				}

				req.clubId = results.clubId;
				res.json({result: 'success'});
				console.log("a user created a club (" + results.clubId + "), id: " + req.user.id);
				next();
			}
		);
	},
	(req, res, next) => {
		let params = {
			operator_user_id: req.user.id,
			club_id: req.clubId,
			title: null,
			content: null,
			type: value.CLUB_MESSAGE_TYPE_CREATE,
			target_id: null,
			target_name: null
		};
		clubMessageService.createClubMessage(params,
			(err, results) => {
				if (err) {
					return console.log(err);
				}
			}
		);
	}
);

clubRoute.get('/search',
	(req, res, next) => {
		clubService.getClubByName({name: req.query.name},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a club was queried , id: " + results.club.id);
			}
		);
	}
);

clubRoute.get('/get_latest_three_club_messages',
	tokenAuthentication,
	clubAuthentication.memberAccess,
	(req, res, next) => {
		const params = {club_id: req.query.club_id};
		clubMessageService.getLatestThreeClubMessagesByClubId(params,
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user got all club messages (" + params.club_id + ") , id: " + params.user_id);
			}
		);
	}
);

clubRoute.get('/get_all_members',
	tokenAuthentication,
	clubAuthentication.memberAccess,
	(req, res, next) => {
		userService.getAllMembersByClubId({club_id: req.query.club_id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user get all members of a club (" + req.query.club_id + "), id: " + req.user.id);
			}
		);
	}
);

clubRoute.get('/get_all_activities',
	tokenAuthentication,
	clubAuthentication.memberAccess,
	(req, res, next) => {
		activityService.getAllActivitiesByClubId({club_id: req.query.club_id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user got all activities in a club (" + req.query.club_id + ") , id: " + req.user.id);
			}
		);
	}
);

clubRoute.get('/get_all_club_bulletins',
	tokenAuthentication,
	clubAuthentication.memberAccess,
	(req, res, next) => {
		clubBulletinService.getAllClubBulletinsByClubId({club_id: req.query.club_id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user got all club bulletins in a club (" + req.query.club_id + ") , id: " + req.user.id);
			}
		);
	}
);

clubRoute.get('/:club_id',
	(req, res, next) => {
		clubService.getClubById({id: req.params.club_id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a club was queried , id: " + results.club.id);
			}
		);
	}
);

module.exports = clubRoute;
