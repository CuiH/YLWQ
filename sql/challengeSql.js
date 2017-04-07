/**
 * Created by CuiH on 2017/4/6.
 */

const challenge = {
	insert: 'INSERT INTO challenge (challenger_user_id, activity_bill_id, message, create_time) VALUES (?, ?, ?, NOW())',
	selectAllByActivityBillId: 'SELECT c.*, u.username AS challenger_username ' +
	                           'FROM challenge c, user u ' +
	                           'WHERE c.activity_bill_id = ? AND c.challenger_user_id = u.id',
	deleteOneById: 'DELETE FROM challenge WHERE id = ?',
	selectOneById: 'SELECT * FROM challenge WHERE id = ?',
	selectOneByUserIdAndActivityBillId: 'SELECT * FROM challenge WHERE challenger_user_id = ? AND activity_bill_id = ?'
};

module.exports = challenge;