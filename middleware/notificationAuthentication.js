const clubModel = require('../model/clubModel');
const userNotificationMapModel = require('../model/userNotificationMapModel');

const value = require('../config/value');


const notificationAuthentication = {
	/* check if the 'notification' is unread, and if the notification belongs to the user, and if the 'notification' exists */
	/* params = {user_id, notification_id} */
	unreadNotification: (req, res, next) => {
		userNotificationMapModel.findOneById({user_id: req.user.id, notification_id: req.body.notification_id},
			(err, results) => {
				if (err) {
					return next(err);
				}

				if (results.length == 0) {
					return next(new Error('no such notification.'));
				}

				if (results[0].user_id != req.user.id) {
					return next(new Error('no access.'));
				}

				if (results[0].is_read == 1) {
					return next(new Error('has already been read.'));
				}

				next();
			}
		);
	},
};

module.exports = notificationAuthentication;
