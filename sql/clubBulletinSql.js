const clubBulletin = {
	insert: 'INSERT INTO club_bulletin (publisher_user_id, title, content, club_id, publish_time) VALUES (?, ?, ?, ?, ?)',
	selectOneById: 'SELECT cb.*, u.username as publisher_username ' +
	               'FROM club_bulletin cb, user u ' +
	               'WHERE cb.publisher_user_id = u.id AND cb.id = ?',
	selectLatestOneByClubId: 'SELECT cb.*, u.username as publisher_username ' +
	                         'FROM club_bulletin cb, user u ' +
	                         'WHERE cb.publisher_user_id = u.id AND cb.club_id = ? ' +
	                         'ORDER BY cb.publish_time desc LIMIT 0, 1',
	selectAllByClubId: 'SELECT cb.*, u.username as publisher_username ' +
	                   'FROM club_bulletin cb, user u ' +
	                   'WHERE cb.publisher_user_id = u.id AND cb.club_id = ?',
};

module.exports = clubBulletin;
