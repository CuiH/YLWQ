const userClubJoin = {
	selectOneByClubId: 'SELECT c.*, u.username AS founder_username ' +
	                   'FROM club c, user u ' +
	                   'WHERE c.founder_user_id = u.id AND c.id = ?',
	selectOneByClubName: 'SELECT c.*, u.username AS founder_username ' +
	                     'FROM club c, user u ' +
	                     'WHERE c.founder_user_id = u.id AND c.name = ?',
	selectAllByUserId: 'SELECT c.id, c.name, c.brief_intro, c.member_number, ucm.join_time, ucm.role ' +
	                   'FROM club c, user_club_map ucm ' +
	                   'WHERE c.id = ucm.club_id AND ucm.user_id = ?',
	selectAllByClubId: 'SELECT u.id, u.username, ucm.join_time , ucm.role ' +
	                   'FROM user u, user_club_map ucm ' +
	                   'WHERE u.id = ucm.user_id AND ucm.club_id = ?',
};

module.exports = userClubJoin;
