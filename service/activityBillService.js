const activityModel = require('../model/activityModel');
const activityBillModel = require('../model/activityBillModel');
const activityBillItemModel = require('../model/activityBillItemModel');
const activityBillParticipantPaymentModel = require('../model/activityBillParticipantPaymentModel');


const value = require('../config/value');


/* get an 'activity_bill' by [id] */
/* params = {id} */
const generateFindActivityBillPromise = (params) => {
	return new Promise((resolve, reject) => {
		activityBillModel.findOneById(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve(results[0]);
			}
		);
	});
};

/* get all 'activity_bill_item' by [activity_bill_id] */
/* params = {activity_bill_id} */
const generateFindActivityBillItemPromise = (params) => {
	return new Promise((resolve, reject) => {
		activityBillItemModel.findAllByActivityBillId(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve(results);
			}
		);
	});
};

/* get all 'activity_bill_participant_payment' by [activity_bill_id] */
/* params = {activity_bill_id} */
const generateFindActivityBillParticipantPaymentPromise = (params) => {
	return new Promise((resolve, reject) => {
		activityBillParticipantPaymentModel.findAllByActivityBillId(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve(results);
			}
		);
	});
};

// create an 'activity_bill' according to the 'activity' [id]
/* params = {activity_id, note, total_cost} */
const generateCreateActivityBillPromise = (params) => {
	return new Promise((resolve, reject) => {
		activityBillModel.create({id: params.activity_id, note: params.note, total_cost: params.total_cost},
			(err, results) => {
				if (err) {
					return reject(err, null);
				}

				resolve();
			}
		);
	})
};

// create an 'activity_bill_item'
/* params = {activity_bill_id, description, cost, note, payer_user_id} */
const generateCreateActivityBillItemPromise = (params) => {
	return new Promise((resolve, reject) => {
		activityBillItemModel.create(params,
			(err, results) => {
				if (err) {
					return reject(err, null);
				}

				resolve(results);
			}
		);
	})
};

// create an 'activity_bill_participant_payment'
/* params = {activity_bill_id, participant_user_id, amount} */
const generateCreateActivityBillParticipantPaymentPromise = (params) => {
	return new Promise((resolve, reject) => {
		activityBillParticipantPaymentModel.create(params,
			(err, results) => {
				if (err) {
					return reject(err, null);
				}

				resolve(results);
			}
		);
	})
};

// update the [activity_bill_status] of the 'activity'
/* params = {activity_id, activity_bill_status} */
const generateUpdateActivityPromise = (params) => {
	return new Promise((resolve, reject) => {
		activityModel.updateActivityBillStatusById({id: params.activity_id, activity_bill_status: params.activity_bill_status},
			(err, results) => {
				if (err) {
					return reject(err, null);
				}

				resolve(results);
			}
		);
	})
};



const activityBillService = {
	/* params = {activity_id, note, activity_bill_items, activity_bill_participant_payments} */
	/* callback: (err, results = {activityBillId}) */
	createActivityBill: (params, callback) => {
		// TODO verify params


		/*
		 a) create a new 'activity_bill' according to the 'activity' [id]
		 b) create 'activity_bill_item' and 'activity_bill_participant_payment'
		 c) update the [activity_bill_status] of the 'activity'
		 */
		let totalCost = 0;
		const items = params.activity_bill_items;
		for (let i = 0; i < items.length; i++) {
			totalCost += items[i].cost;
		}

		generateCreateActivityBillPromise({activity_id: params.activity_id, note: params.note, total_cost: totalCost})
			.then(() => {
				let promises = [];
				for (let i = 0; i < items.length; i++) {
					items[i].activity_bill_id = params.activity_id;
					promises.push(generateCreateActivityBillItemPromise(items[i]));
				}

				const payments = params.activity_bill_participant_payments;
				for (let i = 0; i < payments.length; i++) {
					payments[i].activity_bill_id = params.activity_id;
					promises.push(generateCreateActivityBillParticipantPaymentPromise(payments[i]));
				}

				return Promise.all(promises);
			})
			.then(() => {
				return generateUpdateActivityPromise({
					activity_id: params.activity_id,
					activity_bill_status: value.ACTIVITY_BILL_STATUS_PUBLISHING
				});

			})
			.then(() => {
				callback(null, {activityBillId: params.activity_id});
			})
			.catch((err) => {
				callback(err, null);
			});
	},

	/* params = {id} */
	/* callback: (err, results = {activityBill{..., [{activityBillItems}]}}) */
	getActivityBillById: (params, callback) => {
		// TODO verify params


		/*
		 a) get an 'activity_bill' by [id]
		 b) get all 'activity_bill_item' by [activity_bill_id]
		 c) get all 'activity_bill_participant_payment' by [activity_bill_id]
		 */
		let activityBill = null;
		generateFindActivityBillPromise(params)
			.then((result) => {
				activityBill = result;
				return generateFindActivityBillItemPromise({activity_bill_id: params.id});
			})
			.then((results) => {
				activityBill.activityBillItems = results;
				return generateFindActivityBillParticipantPaymentPromise({activity_bill_id: params.id});
			})
			.then((results) => {
				activityBill.activityBillParticipantPayments = results;
				callback(null, {activityBill: activityBill})
			})
			.catch((err) => {
				callback(err, null);
			});
	},
};

module.exports = activityBillService;
