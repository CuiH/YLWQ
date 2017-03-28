const activity = {
	insert: 'INSERT INTO activity (sponsor_user_id, club_id, name, start_time, end_time, location, brief_intro, ' +
		'note, participant_number, status, create_time, activity_bill_status) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)',
	selectOneById: 'SELECT id, name FROM activity WHERE id = ?',
	increaseParticipantNumberByOneById: 'UPDATE activity SET participant_number = participant_number + 1 WHERE id= ?',
	selectAllByClubId: 'SELECT * FROM activity WHERE club_id = ?',
	updateActivityBillStatusById: 'UPDATE activity SET activity_bill_status = ? WHERE id = ?'
};

module.exports = activity;