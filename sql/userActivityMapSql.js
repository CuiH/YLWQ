const userActivityMap = {
	insert: 'INSERT INTO user_activity_map (user_id, activity_id, attend_time) VALUES ( ?, ?, ?)',
	selectAllByActivityId: 'SELECT * FROM user_activity_map WHERE activity_id = ?',
	selectAllByUserId: 'SELECT * FROM user_activity_map WHERE user_id = ?',
	selectOneByUserIdAndActivityId: 'SELECT * FROM user_activity_map WHERE user_id = ? AND activity_ID = ?',
};

module.exports = userActivityMap;