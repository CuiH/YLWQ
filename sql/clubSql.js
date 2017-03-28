const club = {
	insert: 'INSERT INTO club (founder_user_id, name, brief_intro, create_time, member_number) VALUES ( ?, ?, ?, ?, 1)',
	increaseMemberNumberByOneById: 'UPDATE club SET member_number = member_number + 1 WHERE id= ?',
	selectOneById: 'SELECT * FROM club WHERE id = ?',
	selectOneByName: 'SELECT * FROM club WHERE name = ?',
};

module.exports = club;
