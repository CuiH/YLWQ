const activityBillParticipantPayment = {
	insert: 'INSERT INTO activity_bill_participant_payment (activity_bill_id, participant_user_id, amount) VALUES (?, ?, ?)',
	selectAllByActivityBillId: 'SELECT abpp.*, u.username as participant_username ' +
	                           'FROM activity_bill_participant_payment abpp, user u ' +
	                           'WHERE abpp.participant_user_id = u.id AND activity_bill_id = ?',
};

module.exports = activityBillParticipantPayment;
