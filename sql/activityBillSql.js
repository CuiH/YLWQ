const activityBill = {
	insert: 'INSERT INTO activity_bill (id, publish_time, status, publisher_user_id, last_modify_time) VALUES (?, NOW(), ?, ?, NOW())',
	selectOneById: 'SELECT ab.*, u.username as publisher_username FROM activity_bill ab, user u WHERE ab.id = ? AND ab.publisher_user_id = u.id',
	updateLastModifyTimeById: 'UPDATE activity_bill SET last_modify_time = NOW() WHERE id = ?',
	updateStatusById: 'UPDATE activity_bill SET status = ? WHERE id = ?',
};

module.exports = activityBill;
