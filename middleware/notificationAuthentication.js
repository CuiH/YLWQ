const clubModel = require('../model/clubModel');
const userNotificationMapModel = require('../model/userNotificationMapModel');

const value = require('../config/value');


const notificationAuthentication = {
	/* check if the 'notification' is unread, and if the notification is accessible to the user */
	/* params = {user_id, notification_id} */
	unreadNotification: (req, res, next) => {
		userNotificationMapModel.findOneByUserIdAndNotificationId({
			user_id: req.user.id,
			notification_id: req.body.notification_id
		}).then((results) => {
			if (results.length == 0) {
				return next(new Error('no access.'));
			}

			if (results[0].is_read == 1) {
				return next(new Error('has already been read.'));
			}

			next();
		}).catch(err => next(err));
	}
};

module.exports = notificationAuthentication;
