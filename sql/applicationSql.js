const application = {
	insert: 'INSERT INTO application (applicant_user_id, club_id, create_time, status, message) VALUES (?, ?, NOW(), ?, ?)',
	selectOneByApplicantUserIdAndClubIdAndStatus: 'SELECT * FROM application WHERE applicant_user_id = ? AND club_id = ? AND status = ?',
	selectOneById: 'SELECT a.*, u.username as applicant_username, c.name as club_name ' +
	               'FROM application a, user u, club c ' +
	               'WHERE c.id = a.club_id AND a.applicant_user_id = u.id AND a.id = ?',
	updateById: 'UPDATE application SET status = ?, replier_user_id = ?, reply_time = NOW() WHERE id = ?',
};

module.exports = application;
