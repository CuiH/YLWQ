const activityModel = require('../model/activityModel');
const activityBillModel = require('../model/activityBillModel');
const activityBillItemModel = require('../model/activityBillItemModel');
const userPaymentModel = require('../model/userPaymentModel');
const userAccountModel = require('../model/userAccountModel');
const activityBillParticipantPaymentModel = require('../model/activityBillParticipantPaymentModel');

const value = require('../config/value');


const activityBillService = {
	/* params = {user_id, id, activityBillItems, activityBillParticipantPayments} */
	/* results = {} */
	createActivityBill: (params) => {
		/*
		 a) create a new 'activity_bill' according to the 'activity' [id]
		 b) create 'activity_bill_item' and 'activity_bill_participant_payment'
		 c) update the [activity_bill_status] of the 'activity'
		 */
		return activityBillModel.create({id: params.id, publisher_user_id: params.user_id})
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

	/* params = {id} */
	/* results = {activityBill{..., activityBillItems, activityBillParticipantPayments}}) */
	getActivityBillById: (params) => {
		/*
		 a) get an 'activity_bill' by [id]
		 b) get all 'activity_bill_item' by [activity_bill_id]
		 c) get all 'activity_bill_participant_payment' by [activity_bill_id]
		 */
		let activityBill = null;
		return activityBillModel.findOneById(params)
			.then((results) =>{
				activityBill = results[0];

				return activityBillItemModel.findAllByActivityBillId({activity_bill_id: params.id});
			})
			.then((results) => {
				activityBill.activityBillItems = results;

				return activityBillParticipantPaymentModel.findAllByActivityBillId({activity_bill_id: params.id});
			})
			.then((results) => {
				activityBill.activityBillParticipantPayments = results;

				return {activityBill: activityBill};
			});
	},

	/* params = {id} */
	/* results = {activityBill}) */
	getActivityBillById2: (params) => {
		/*
		 a) get an 'activity_bill' by [id]
		 */
		return activityBillModel.findOneById(params)
			.then((results) =>{
				return {activityBill: results[0]};
			});
	},

	/* params = {id, activityBillItems[{}], activityBillParticipantPayments} */
	/* results = {}) */
	updateActivityBillById: (params) => {
		/*
		 a) handel 'activity_bill_item'
		  & handle 'activity_bill_participant_payment'
		 c) update 'activity_bill'
		 */
		let promises = [];

		for (let i = 0; i < params.activityBillItems.length; i++) {
			const currentItem = params.activityBillItems[i];
			if (currentItem.flag == 0) {
				currentItem.activity_bill_id = params.id;
				promises.push(activityBillItemModel.create(currentItem));
			} else if (currentItem.flag == 1) {
				promises.push(activityBillItemModel.updateOneById(currentItem))
			} else if (currentItem.flag == 2) {
				promises.push(activityBillItemModel.deleteOneById({id: currentItem.id}));
			}
		}

		for (let i = 0; i < params.activityBillParticipantPayments.length; i++) {
			const currentPayment = params.activityBillParticipantPayments[i];
			promises.push(activityBillParticipantPaymentModel.updateOneById(currentPayment));
		}

		return Promise.all(promises)
			.then(() => {
				return activityBillModel.updateLastModifyTimeById({id: params.id});
			})
			.then(() => {
				return {};
			});
	},

	/* params = {activity_bill_id} */
	/* results = {}) */
	finishActivityBill: (params) => {
		/*
		 a) get all 'activity_bill_participant_payment'
		 b) create 'user_payment' according to 'activity_bill_participant_payment'
		  & update 'user_account'
		 c) create 'user_payment' according to 'activity_bill_item'
		  & update 'user_account'
		 c) update 'activity_bill'
		 */
		return activityBillParticipantPaymentModel.findAllByActivityBillId(params)
			.then((results) => {
				let promises = [];
				for (let i = 0; i < results.length; i++) {
					const currentPayment = results[i];
					promises.push(userPaymentModel.create({
						amount: currentPayment.amount,
						description: null,
						user_id: currentPayment.participant_user_id,
						type: value.USER_PAYMENT_TYPE_ACTIVITY_PAY,
						target_id: params.activity_bill_id
					}));

					promises.push(userAccountModel.updateBalanceById({
						balance_change: -currentPayment.amount,
						id: currentPayment.participant_user_id
					}));
				}

				return Promise.all(promises);
			})
			.then(() => {
				return activityBillItemModel.findAllByActivityBillId(params);
			})
			.then((results) => {
				let promises = [];
				for (let i = 0; i < results.length; i++) {
					const currentItem = results[i];
					promises.push(userPaymentModel.create({
						amount: currentItem.cost,
						description: null,
						user_id: currentItem.payer_user_id,
						type: value.USER_PAYMENT_TYPE_ACTIVITY_GAIN,
						target_id: params.activity_bill_id
					}));

					promises.push(userAccountModel.updateBalanceById({
						balance_change: +currentItem.cost,
						id: currentItem.payer_user_id
					}));
				}

				return Promise.all(promises);
			})
			.then(() => {
				return activityBillModel.updateStatusById({
					status: value.ACTIVITY_BILL_STATUS_FINISHED,
					id: params.activity_bill_id
				});
			})
			.then(() => {
				return {};
			})
	},

};

module.exports = activityBillService;
