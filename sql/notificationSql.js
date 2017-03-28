const notification = {
	insert: 'INSERT INTO notification (title, content, create_time, type, target_id, target_name) ' +
	        'VALUES (?, ?, ?, ?, ?, ?)',
	selectAllByUserId: 'SELECT n.*, unm.is_read ' +
	                   'FROM notification n, user_notification_map unm ' +
	                   'WHERE unm.notification_id = n.id AND unm.user_id = ?'
};

module.exports = notification;
