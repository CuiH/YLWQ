const express = require('express');
const bodyParser = require('body-parser');

const clubBulletinService = require('../../service/clubBulletinService');

const tokenAuthentication = require('../../middleware/tokenAuthentication');
const clubAuthentication = require('../../middleware/clubAuthentication');
const clubBulletinAuthentication = require('../../middleware/clubBulletinAuthentication');

const clubBulletinRoute = express.Router();


clubBulletinRoute.post('/create',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	clubAuthentication.adminAccess,
	(req, res, next) => {
		let params = req.body;
		params.publisher_user_id = req.user.id;
		clubBulletinService.createClubBulletin(req.body,
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success'});
				console.log("a user published a bulletin (" + results.clubBulletinId + "), id: " + params.publisher_user_id);
			}
		);
	}
);

clubBulletinRoute.get('/get_latest_one',
	tokenAuthentication,
	clubAuthentication.memberAccess,
	(req, res, next) => {
		clubBulletinService.getLatestClubBulletinByClubId({club_id: req.query.club_id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user got a latest club_bulletin, id: " + req.user.id);
			}
		);
	}
);

clubBulletinRoute.get('/:club_bulletin_id',
	tokenAuthentication,
	clubBulletinAuthentication.readAccess,
	(req, res, next) => {
		clubBulletinService.getClubBulletinById({id: req.params.club_bulletin_id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user got a club_bulletin (" + req.params.club_bulletin_id + "), id: " + req.user.id);
			}
		);
	}
);

module.exports = clubBulletinRoute;
