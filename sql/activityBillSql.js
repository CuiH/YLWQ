const activityBill = {
	insert: 'INSERT INTO activity_bill (id, note, publish_time, status, publisher_user_id, last_modify_time) VALUES (?, ?, ?, ?, ?, ?)',
	selectOneById: 'SELECT * FROM activity_bill WHERE id = ?',
	updateLastModifyTimeById: 'UPDATE activity_bill SET total_cost = total_cost + ?, last_modify_time = ? WHERE id = ?',
};

module.exports = activityBill;
