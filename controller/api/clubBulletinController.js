const express = require('express');
const bodyParser = require('body-parser');

const clubBulletinService = require('../../service/clubBulletinService');
const clubMessageService = require('../../service/clubMessageService');

const tokenAuthentication = require('../../middleware/tokenAuthentication');
const clubAuthentication = require('../../middleware/clubAuthentication');
const clubBulletinAuthentication = require('../../middleware/clubBulletinAuthentication');

const value = require('../../config/value');


const clubBulletinRoute = express.Router();

clubBulletinRoute.post('/create',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	clubAuthentication.adminAccess,
	(req, res, next) => {
		let params = req.body;
		params.publisher_user_id = req.user.id;
		clubBulletinService.createClubBulletin(req.body)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user published a club_bulletin.");
			})
			.catch(err => next(err));
	}
);

clubBulletinRoute.get('/get_latest_one',
	tokenAuthentication,
	clubAuthentication.memberAccess,
	(req, res, next) => {
		clubBulletinService.getLatestClubBulletinByClubId({club_id: req.query.club_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user got the latest club_bulletin.");
			})
			.catch(err => next(err));
	}
);

module.exports = clubBulletinRoute;
