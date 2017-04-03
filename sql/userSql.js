const user = {
	insert: 'INSERT INTO user (username, password, create_time, last_login_time) ' +
		'VALUES (?, ?, ?, ?)',
	selectOneByUsername: 'SELECT * FROM user where username = ?',
	selectOneById: 'SELECT * FROM user where id = ?',
	selectOneById2: 'SELECT id, username, phone, email FROM user where id = ?',
	updateLastLoginTimeById: 'UPDATE user SET last_login_time = ? WHERE id = ?',
};

module.exports = user;
