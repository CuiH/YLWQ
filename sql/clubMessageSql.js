const clubMessage = {
	insert: 'INSERT INTO club_message (operator_user_id, club_id, title, content, type, ' +
	                                  'create_time, target_id, target_name) ' +
	        'VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
	selectLatestThreeByClubId: 'SELECT t.*, u.username as operator_username ' +
                               'FROM (SELECT * FROM club_message ' +
	                                 'WHERE club_id = ? ORDER BY create_time DESC LIMIT 3) as t ' +
                               'LEFT JOIN ' +
                               'user u ' +
                               'ON ' +
                               'u.id = t.operator_user_id',
	selectAllByClubId: 'SELECT cm.*, u.username as operator_username ' +
	                   'FROM club_message cm, user u ' +
	                   'WHERE cm.club_id = ? AND u.id = cm.operator_user_id',
};

module.exports = clubMessage;
