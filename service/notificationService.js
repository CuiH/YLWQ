const notificationModel = require('../model/notificationModel');
const userNotificationMapModel = require('../model/userNotificationMapModel');


const notificationService = {
	/* params = {title, content, type, object_id, object_name, subject_id, subject_name, receiver_user_id} */
	/* results = {notificationId} */
	sendNotification: (params) => {
		/*
		 a) create a new 'notification'
		 b) create a new 'user_notification_map'
		 */
		let notificationId = null;
		return notificationModel.create({
			title: params.title,
			content: params.content,
			type: params.type,
			object_id: params.object_id,
			object_name: params.object_name,
			subject_id: params.subject_id,
			subject_name: params.subject_name,
		}).then((result) => {
			notificationId = result.insertId;

			return userNotificationMapModel.create({
				user_id: params.receiver_user_id,
				notification_id: notificationId
			});
		}).then(() => {
			return {notificationId: notificationId};
		})
	},

	/* params = {title, content, type, object_id, object_name, subject_id, subject_name, receivers = [{user_id}]} */
	/* results = {notificationId} */
	sendMultipleNotifications: (params) => {
		/*
		 a) create a new 'notification'
		 b) create multiple 'user_notification_map'
		 */
		let notificationId = null;
		return notificationModel.create({
			title: params.title,
			content: params.content,
			type: params.type,
			object_id: params.object_id,
			object_name: params.object_name,
			subject_id: params.subject_id,
			subject_name: params.subject_name,
		}).then((result) => {
			notificationId = result.insertId;

			let promises = [];
			for (let i = 0; i < params.receivers.length; i++) {
				promises.push(userNotificationMapModel.create({
					user_id: params.receivers[i].user_id || params.receivers[i].id,
					notification_id: notificationId
				}));
			}

			return Promise.all(promises);
		}).then(() => {
			return {notificationId: notificationId};
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
