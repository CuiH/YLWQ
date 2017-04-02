const express = require('express');
const bodyParser = require('body-parser');

const notificationService = require('../../service/notificationService');

const tokenAuthentication = require('../../middleware/tokenAuthentication');
const notificationAuthentication = require('../../middleware/notificationAuthentication');

const value = require('../../config/value');


const notificationRoute = express.Router();

notificationRoute.post('/read',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	notificationAuthentication.unreadNotification,
	(req, res, next) => {
		notificationService.readNotification({user_id: req.user.id, notification_id: req.body.notification_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user read a notification.");
			});
	}
);

module.exports = notificationRoute;
