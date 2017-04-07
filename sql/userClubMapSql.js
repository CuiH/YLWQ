const userClubMap = {
	insert: 'INSERT INTO user_club_map (club_id, user_id, join_time, role) VALUES (?, ?, NOW(), ?)',
	selectAllByUserId: 'SELECT * FROM user_club_map WHERE user_id = ?',
	selectOneByUserIdAndClubId: 'SELECT * FROM user_club_map WHERE user_id = ? AND club_id = ?',
	selectOneByUserIdAndActivityId: 'SELECT user_club_map.* FROM activity, user_club_map ' +
	                                'WHERE activity.club_id = user_club_map.club_id ' +
	                                'AND user_club_map.user_id = ? AND activity.id = ?',
	selectOneByUserIdAndApplicationId: 'SELECT user_club_map.* FROM application, user_club_map ' +
	                                   'WHERE application.club_id = user_club_map.club_id ' +
	                                   'AND user_club_map.user_id = ? AND application.id = ?',
	selectAllByClubIdAndRole: 'SELECT * FROM user_club_map WHERE club_id = ? AND role in (?, ?)',
	selectOneByUserIdAndClubBulletinId: 'SELECT * FROM user_club_map ucm, club_bulletin cb ' +
	                                    'WHERE ucm.club_id = cb.club_id AND ucm.user_id = ? AND cb.id = ?',
	selectAllByActivityId: 'SELECT ucm.* FROM user_club_map ucm, activity a ' +
	                       'WHERE ucm.club_id = a.club_id AND a.id = ?',
	deleteOneByUserIdAndClubId: 'DELETE FROM user_club_map WHERE user_id = ? AND club_id = ?',
};

module.exports = userClubMap;
