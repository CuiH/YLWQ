const userAccount = {
	insert: 'INSERT INTO user_account (id, balance) VALUES (?, ?)',
	updateBalanceById: 'UPDATE user_account SET balance = balance + ? WHERE id = ?',
	selectOneById: 'SELECT * FROM user_account WHERE id = ?'
};

module.exports = userAccount;
