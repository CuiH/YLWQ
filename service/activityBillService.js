const activityModel = require('../model/activityModel');
const activityBillModel = require('../model/activityBillModel');
const activityBillItemModel = require('../model/activityBillItemModel');
const activityBillParticipantPaymentModel = require('../model/activityBillParticipantPaymentModel');

const value = require('../config/value');


const activityBillService = {
	/* params = {user_id, activity_id, note, activityBillItems, activityBillParticipantPayments} */
	/* results = {} */
	createActivityBill: (params) => {
		/*
		 a) create a new 'activity_bill' according to the 'activity' [id]
		 b) create 'activity_bill_item' and 'activity_bill_participant_payment'
		 c) update the [activity_bill_status] of the 'activity'
		 */
		return activityBillModel.create({id: params.id, note: params.note, publisher_user_id: params.user_id})
			.then(() => {
				let promises = [];

				const items = params.activityBillItems;
				for (let i = 0; i < items.length; i++) {
					items[i].activity_bill_id = params.id;
					promises.push(activityBillItemModel.create(items[i]));
				}

				const payments = params.activityBillParticipantPayments;
				for (let i = 0; i < payments.length; i++) {
					payments[i].activity_bill_id = params.id;
					promises.push(activityBillParticipantPaymentModel.create(payments[i]));
				}

				return Promise.all(promises);
			})
			.then(() => {
				return activityModel.updateActivityBillStatusById({
					id: params.id,
					activity_bill_status: value.ACTIVITY_BILL_STATUS_PUBLISHING
				});
			})
			.then(() => {
				return {};
			});
	},

	/* params = {activity_bill_id} */
	/* results = {activityBill{..., [{activityBillItems}], [{activityBillParticipantPayments}]}}) */
	getActivityBillById: (params) => {
		/*
		 a) get an 'activity_bill' by [id]
		 b) get all 'activity_bill_item' by [activity_bill_id]
		 c) get all 'activity_bill_participant_payment' by [activity_bill_id]
		 */
		let activityBill = null;
		return activityBillModel.findOneById({id: params.activity_bill_id})
			.then((results) =>{
				activityBill = results[0];

				return activityBillItemModel.findAllByActivityBillId(params);
			})
			.then((results) => {
				activityBill.activityBillItems = results;

				return activityBillParticipantPaymentModel.findAllByActivityBillId(params);
			})
			.then((results) => {
				activityBill.activityBillParticipantPayments = results;

				return {activityBill: activityBill};
			});
	},
};

module.exports = activityBillService;
