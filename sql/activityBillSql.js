const activityBill = {
	insert: 'INSERT INTO activity_bill (id, note, publish_time, status, publisher_user_id, last_modify_time) VALUES (?, ?, NOW(), ?, ?, NOW())',
	selectOneById: 'SELECT ab.*, u.username as publisher_username FROM activity_bill ab, user u WHERE ab.id = ? AND ab.publisher_user_id = u.id',
	updateLastModifyTimeById: 'UPDATE activity_bill SET total_cost = total_cost + ?, last_modify_time = ? WHERE id = ?',
};

module.exports = activityBill;
