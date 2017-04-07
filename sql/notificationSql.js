const value = require('../config/value');

const notification = {
	insert: 'INSERT INTO notification (title, content, type, object_id, object_name, subject_id, subject_name) ' +
	        'VALUES (?, ?, ?, ?, ?, ?, ?)',
	selectAllByUserId: 'SELECT n.*, unm.is_read, unm.create_time ' +
	                   'FROM notification n, user_notification_map unm ' +
	                   'WHERE unm.notification_id = n.id AND unm.user_id = ? ' +
		               'ORDER BY unm.create_time LIMIT ?, ' + value.PAGE_SIZE
};

module.exports = notification;
