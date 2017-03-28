const userNotificationMap = {
	insert: 'INSERT INTO user_notification_map (user_id, notification_id, is_read) VALUES (?, ?, 0)',
	updateIsReadByUserIdAndNotification: 'UPDATE user_notification_map SET is_read = 1, read_time = ? WHERE user_id = ? AND notification_id = ?',
	selectOneByUserIdAndNotificationId: 'SELECT * FROM user_notification_map WHERE user_id = ? AND notification_id = ?',
};

module.exports = userNotificationMap;
