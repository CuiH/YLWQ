const express = require('express');
const bodyParser = require('body-parser');

const activityBillService = require('../../service/activityBillService');

const tokenAuthentication = require('../../middleware/tokenAuthentication');
const activityBillAuthentication = require('../../middleware/activityBillAuthentication');
const activityAuthentication = require('../../middleware/activityAuthentication');
const clubAuthentication = require('../../middleware/clubAuthentication');

const activityBillRoute = express.Router();


activityBillRoute.post('/create',
	tokenAuthentication,
	bodyParser.json(),
	activityAuthentication.sponsorAccess,
	activityBillAuthentication.unpublishedActivityBill,
	clubAuthentication.payerAndParticipantMemberAccess,
	(req, res, next) => {
		activityBillService.createActivityBill(req.body,
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user created an activity_bill (" + req.body.activity_id + ") , id: " + req.user.id);
			}
		);
	}
);

activityBillRoute.get('/:activity_bill_id',
	tokenAuthentication,
	activityBillAuthentication.readAccess,
	activityBillAuthentication.publishedActivityBill,
	(req, res, next) => {
		const params = {id: req.params.activity_bill_id};
		activityBillService.getActivityBillById(params,
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success', data: results});
				console.log("a user got a an activity_bill (" + req.params.activity_bill_id + ") , id: " + req.user.id);
			}
		);
	}
);

module.exports = activityBillRoute;
