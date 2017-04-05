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
		clubService.createClub(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user created a club.");

				let clubMessageParams = {
					operator_user_id: req.user.id,
					club_id: results.clubId,
					title: null,
					content: null,
					type: value.CLUB_MESSAGE_TYPE_CREATE,
					target_id: null,
					target_name: null
				};

				return clubMessageService.createClubMessage(clubMessageParams);
			})
			.then(() => {
				console.log("a club message was created.");
			})
			.catch(err => next(err));
	}
);

clubRoute.get('/get_latest_three_club_messages',
	tokenAuthentication,
	clubAuthentication.memberAccess,
	(req, res, next) => {
		const params = {club_id: req.query.club_id};
		clubMessageService.getLatestThreeClubMessagesByClubId(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got all club messages of a club.");
			})
			.catch(err => next(err));
	}
);

clubRoute.get('/get_all_club_messages',
	tokenAuthentication,
	clubAuthentication.memberAccess,
	(req, res, next) => {
		const params = {club_id: req.query.club_id};
		clubMessageService.getAllClubMessagesByClubId(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got all club messages of a club.");
			})
			.catch(err => next(err));
	}
);

clubRoute.get('/get_all_members',
	tokenAuthentication,
	clubAuthentication.memberAccess,
	(req, res, next) => {
		userService.getAllMembersByClubId({club_id: req.query.club_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user get all members of a club.");
			})
			.catch(err => next(err));
	}
);

clubRoute.get('/get_all_activities',
	tokenAuthentication,
	clubAuthentication.memberAccess,
	(req, res, next) => {
		activityService.getAllActivitiesByClubId({club_id: req.query.club_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got all activities of a club.");
			})
			.catch(err => next(err));
	}
);

clubRoute.get('/get_all_club_bulletins',
	tokenAuthentication,
	clubAuthentication.memberAccess,
	(req, res, next) => {
		clubBulletinService.getAllClubBulletinsByClubId({club_id: req.query.club_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got all club bulletins of a club.");
			})
			.catch(err => next(err));
	}
);

clubRoute.post('/update',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	clubAuthentication.adminAccess,
	(req, res, next) => {
		clubService.updateClubById(req.body)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user updated a club.");
			})
			.catch(err => next(err));
	}
);

clubRoute.get('/get_hottest_three',
	(req, res, next) => {
		clubService.getHottestThreeClubs()
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got three hottest clubs.");
			})
			.catch(err => next(err));
	}
);

clubRoute.get('/:club_id',
	(req, res, next) => {
		clubService.getClubById({id: req.params.club_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a club was queried.");
			})
			.catch(err => next(err));
	}
);

module.exports = clubRoute;
