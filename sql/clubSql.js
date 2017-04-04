const club = {
	insert: 'INSERT INTO club (founder_user_id, name, brief_intro, create_time, member_number) VALUES ( ?, ?, ?, NOW(), 1)',
	increaseMemberNumberByOneById: 'UPDATE club SET member_number = member_number + 1 WHERE id = ?',
	selectOneById: 'SELECT * FROM club WHERE id = ?',
	updateOneById: 'UPDATE club SET brief_intro = ? WHERE id = ?'
};

module.exports = club;
