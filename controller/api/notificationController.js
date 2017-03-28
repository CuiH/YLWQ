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
		notificationService.readNotification({user_id: req.user.id, notification_id: req.body.notification_id},
			(err, results) => {
				if (err) {
					// TODO handle error
					return next(err);
				}

				res.json({result: 'success'});
				console.log("a user read a notification (" + req.body.notification_id + ") , id: " + req.user.id);
			}
		);
	}
);

module.exports = notificationRoute;
