const clubMessage = {
	insert: 'INSERT INTO club_message (operator_user_id, club_id, title, content, type, ' +
	                                  'create_time, target_id, target_name) ' +
	        'VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
	selectAllByClubId: 'SELECT * FROM club_message WHERE club_id = ?',
};

module.exports = clubMessage;
