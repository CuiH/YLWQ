const express = require('express');

const checkingService = require('../../service/checkingService');


const checkingRoute = express.Router();

checkingRoute.get('/user_club_map',
	(req, res, next) => {
		checkingService.checkUserClubMap({user_id: req.query.user_id, club_id: req.query.club_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user checked user_club_map.");
			})
			.catch(err => next(err));
	}
);

checkingRoute.get('/user_activity_map',
	(req, res, next) => {
		checkingService.checkUserActivityMap({user_id: req.query.user_id, activity_id: req.query.activity_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user checked user_activity_map.");
			})
			.catch(err => next(err));
	}
);

checkingRoute.get('/user_club_map_admin',
	(req, res, next) => {
		checkingService.checkUserClubMapAdmin({user_id: req.query.user_id, club_id: req.query.club_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user checked user_club_map_admin.");
			})
			.catch(err => next(err));
	}
);

checkingRoute.get('/user_activity_sponsor',
	(req, res, next) => {
		checkingService.checkActivitySponsor({user_id: req.query.user_id, activity_id: req.query.activity_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user checked user_activity_sponsor.");
			})
			.catch(err => next(err));
	}
);

checkingRoute.get('/application_unread',
	(req, res, next) => {
		checkingService.checkApplicationUnread({user_id: req.query.user_id, club_id: req.query.club_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user checked application_unread.");
			})
			.catch(err => next(err));
	}
);

checkingRoute.get('/activity_bill_creator',
	(req, res, next) => {
		checkingService.checkActivityBillCreator({user_id: req.query.user_id, activity_bill_id: req.query.activity_bill_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user checked activity_bill_creator.");
			})
			.catch(err => next(err));
	}
);

checkingRoute.get('/activity_bill_unfinished',
	(req, res, next) => {
		checkingService.checkActivityBillUnfinished({activity_bill_id: req.query.activity_bill_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user checked activity_bill_unfinished.");
			})
			.catch(err => next(err));
	}
);

checkingRoute.get('/challenge',
	(req, res, next) => {
		checkingService.checkChallenge({challenger_user_id: req.query.user_id, activity_bill_id: req.query.activity_bill_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user checked challenge.");
			})
			.catch(err => next(err));
	}
);

module.exports = checkingRoute;
