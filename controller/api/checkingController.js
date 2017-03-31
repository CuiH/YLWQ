const express = require('express');
const bodyParser = require('body-parser');

const checkingService = require('../../service/checkingService');

const checkingRoute = express.Router();

checkingRoute.get('/user_club_map',
	(req, res, next) => {
		checkingService.checkUserClubMap({user_id: req.query.user_id, club_id: req.query.club_id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user checked user_club_map");
			}
		);
	}
);

checkingRoute.get('/user_activity_map',
	(req, res, next) => {
		checkingService.checkUserActivityMap({user_id: req.query.user_id, activity_id: req.query.activity_id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user checked user_activity_map");
			}
		);
	}
);

checkingRoute.get('/user_club_map_admin',
	(req, res, next) => {
		checkingService.checkUserClubMapAdmin({user_id: req.query.user_id, club_id: req.query.club_id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user checked user_club_map_admin");
			}
		);
	}
);

module.exports = checkingRoute;
