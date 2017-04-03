const userDetail = {
	insert: 'INSERT INTO user_detail (id) VALUES (?)',
	selectOneById: 'SELECT gender, description, DATE(birthdate) as birthdate FROM user_detail WHERE id = ?',
	updateById: 'UPDATE user_detail SET birthdate = ?, gender = ?, description = ? WHERE id = ?'
};

module.exports = userDetail;
