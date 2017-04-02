const activity = {
	insert: 'INSERT INTO activity (sponsor_user_id, club_id, name, start_time, end_time, location, brief_intro, ' +
		                          'note, participant_number, create_time, activity_bill_status) ' +
	        'VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)',
	selectOneById: 'SELECT id, name FROM activity WHERE id = ?',
	increaseParticipantNumberByOneById: 'UPDATE activity SET participant_number = participant_number + 1 WHERE id= ?',
	selectAllByClubId: 'SELECT a.id, a.name, a.sponsor_user_id, a.start_time, a.end_time, a.location, ' +
	                          'a.brief_intro, a.participant_number, a.create_time, u.username as sponsor_username ' +
	                   'FROM activity a, user u ' +
	                   'WHERE u.id = a.sponsor_user_id AND a.club_id = ?',
	updateActivityBillStatusById: 'UPDATE activity SET activity_bill_status = ? WHERE id = ?',
	selectAllByUserId: 'SELECT id, name, start_time, end_time, location, brief_intro, participant_number, create_time FROM activity WHERE sponsor_user_id = ?'
};

module.exports = activity;