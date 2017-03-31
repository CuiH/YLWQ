const userActivityJoin = {
	selectOneByActivityId: 'SELECT a.*, u.username AS sponsor_username, c.name as club_name ' +
	                       'FROM activity a, user u, club c ' +
	                       'WHERE a.sponsor_user_id = u.id AND c.id = a.club_id AND a.id = ?',
	selectAllByActivityId: 'SELECT u.id, u.username, uam.attend_time ' +
	                       'FROM user u, user_activity_map uam ' +
	                       'WHERE u.id = uam.user_id AND uam.activity_id = ?',
	selectAllByUserId: 'SELECT a.id, a.name, a.start_time, a.end_time, a.location, ' +
	                          'a.brief_intro, a.participant_number, uam.attend_time ' +
	                   'FROM activity a, user_activity_map uam ' +
	                   'WHERE a.id = uam.activity_id AND uam.user_id = ?'
};

module.exports = userActivityJoin;
