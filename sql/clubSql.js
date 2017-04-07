const club = {
	insert: 'INSERT INTO club (founder_user_id, name, brief_intro, create_time, member_number) VALUES ( ?, ?, ?, NOW(), 1)',
	increaseMemberNumberByOneById: 'UPDATE club SET member_number = member_number + 1 WHERE id = ?',
	selectOneById: 'SELECT * FROM club WHERE id = ?',
	updateOneById: 'UPDATE club SET brief_intro = ? WHERE id = ?',
	selectHottestThree: 'SELECT id, name, brief_intro, member_number FROM club ORDER BY member_number desc LIMIT 0, 3',
	selectAllByPartName: 'SELECT c.*, u.username as founder_username FROM club c, user u WHERE c.name like ? AND c.founder_user_id = u.id'
};

module.exports = club;
