const notificationModel = require('../model/notificationModel');
const userNotificationMapModel = require('../model/userNotificationMapModel');


/* create a new 'notification' */
/* params = {title, content, type, target_id, target_name} */
const generateCreateNotificationPromise = (params) => {
	return new Promise((resolve, reject) => {
		notificationModel.create(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve(results);
			}
		);
	});
};

/* create a new 'notification' */
/* params = {user_id, notification_id} */
const generateCreateUserNotificationMapPromise = (params) => {
	return new Promise((resolve, reject) => {
		userNotificationMapModel.create(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve();
			}
		);
	});
};

const notificationService = {
	/* params = {title, content, type, target_id, target_name, receiver_user_id} */
	/* callback: (err, results = {notificationId}) */
	sendNotification: (params, callback) => {
		// TODO verify params


		/*
		 a) create a new 'notification'
		 */
		notificationModel.create(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {notificationId: results.insertId});
			}
		);
	},

	/* params = {title, content, type, target_id, target_name, receivers = [{user_id}]} */
	/* callback: (err, results = {notificationId}) */
	sendMultipleNotifications: (params, callback) => {
		// TODO verify params


		/*
		 a) create a new 'notification'
		 b) create multiple 'user_notification_map'
		 */
		let notificationId = null;
		generateCreateNotificationPromise({title: params.title, content: params.content, type: params.type,
			target_id: params.target_id, target_name: params.target_name})
			.then((result) => {
				notificationId = result.insertId;
				let promises = [];
				for (let i = 0; i < params.receivers.length; i++) {
					promises.push(generateCreateUserNotificationMapPromise({user_id: params.receivers[i].user_id,
						notification_id: notificationId}));
				}
				return Promise.all(promises);
			}).then(() => {
				callback(null, {notificationId: notificationId});
			}).catch((err) => {
				callback(err, null);
			});
	},

	/* params = {user_id} */
	/* callback: (err, results = {notifications}) */
	getAllNotificationsByUserId: (params, callback) => {
		// TODO verify params


		/*
		 a) get all 'notification' by [user_id]
		 */
		notificationModel.findAllByUserId(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {notifications: results});
			}
		);
	},

	/* params = {user_id, notification_id} */
	/* callback: (err, results = {}) */
	readNotification: (params, callback) => {
		// TODO verify params


		/*
		 a) update 'notification' by [user_id] and [notification_id]
		 */
		userNotificationMapModel.updateIsReadById(params,
			(err, results) => {
				if (err) {
					return callback(err, null);
				}

				callback(null, {});
			}
		);
	},
};

module.exports = notificationService;
