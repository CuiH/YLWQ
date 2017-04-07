const activityBillItem = {
	insert: 'INSERT INTO activity_bill_item (activity_bill_id, description, cost, note, payer_user_id) VALUES (?, ?, ?, ?, ?)',
	selectAllByActivityBillId: 'SELECT abi.*, u.username as payer_username ' +
	                           'FROM activity_bill_item abi, user u ' +
	                           'WHERE abi.payer_user_id = u.id AND activity_bill_id = ?',
	updateOneById: 'UPDATE activity_bill_item SET description = ?, cost = ?, note = ?, payer_user_id = ? WHERE id = ?',
	deleteOneById: 'DELETE FROM activity_bill_item WHERE id = ?',
};

module.exports = activityBillItem;
