const activityBillItem = {
	insert: 'INSERT INTO activity_bill_item (activity_bill_id, description, cost, note, payer_user_id) VALUES (?, ?, ?, ?, ?)',
	selectAllByActivityBillId: 'SELECT abi.*, u.username as payer_username ' +
	                           'FROM activity_bill_item abi, user u ' +
	                           'WHERE abi.payer_user_id = u.id AND activity_bill_id = ?',
};

module.exports = activityBillItem;
