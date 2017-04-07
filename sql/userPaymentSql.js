/**
 * Created by CuiH on 2017/4/7.
 */

const userPayment = {
	insert: 'INSERT INTO user_payment (amount, create_time, description, type, user_id, target_id, target_name) VALUES (?, NOW(), ?, ?, ?, ?, ?)',
	selectAllByUserId: 'SELECT * FROM user_payment WHERE user_id = ?',

};

module.exports = userPayment;
