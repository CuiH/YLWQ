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
	/* params = {title, content, type, object_id, object_name, subject_id, subject_name, receiver_user_id} */
	/* callback: (err, results = {notificationId}) */
	sendNotification: (params, callback) => {
		// TODO verify params


		/*
		 a) create a new 'notification'
		 b) create a new 'user_notification_map'
		 */
		let notificationId = null;
		generateCreateNotificationPromise({
			title: params.title,
			content: params.content,
			type: params.type,
			object_id: params.object_id,
			object_name: params.object_name,
			subject_id: params.subject_id,
			subject_name: params.subject_name,
		})
		.then((result) => {
			notificationId = result.insertId;
			return generateCreateUserNotificationMapPromise({
				user_id: params.receiver_user_id,
				notification_id: notificationId
			})
		})
	},

	/* params = {title, content, type, object_id, object_name, subject_id, subject_name, receivers = [{user_id}]} */
	/* callback: (err, results = {notificationId}) */
	sendMultipleNotifications: (params, callback) => {
		// TODO verify params


		/*
		 a) create a new 'notification'
		 b) create multiple 'user_notification_map'
		 */
		let notificationId = null;
		generateCreateNotificationPromise({
			title: params.title,
			content: params.content,
			type: params.type,
			object_id: params.object_id,
			object_name: params.object_name,
			subject_id: params.subject_id,
			subject_name: params.subject_name,
		})
		.then((result) => {
			notificationId = result.insertId;
			let promises = [];
			for (let i = 0; i < params.receivers.length; i++) {
				promises.push(generateCreateUserNotificationMapPromise({
					user_id: params.receivers[i].user_id || params.receivers[i].id,
					notification_id: notificationId
				}));
			}
			return Promise.all(promises);
		}).then(() => {
			callback(null, {notificationId: notificationId});
		}).catch((err) => {
			callback(err, null);
		});
	},

	/* params = {user_id} */
	/* results = {notifications} */
	getAllNotificationsByUserId: (params) => {
		/*
		 a) get all 'notification' by [user_id]
		 */
		return notificationModel.findAllByUserId(params)
			.then((results) => {
				return {notifications: results};
			});
	},

	/* params = {user_id, notification_id} */
	/* results = {} */
	readNotification: (params) => {
		// TODO verify params


		/*
		 a) update 'notification' by [user_id] and [notification_id]
		 */
		return userNotificationMapModel.updateIsReadByUserIdAndNotificationId(params)
			.then((results) => {
				return {};
			});
	},
};

module.exports = notificationService;
