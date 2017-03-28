const activityBillModel = require('../model/activityBillModel');
const activityBillItemModel = require('../model/activityBillItemModel');

const value = require('../config/value');


/* create a new 'activity_bill_item' */
/* params = {activity_bill_id, description, cost, note} */
const generateCreateActivityBillItemPromise = (params) => {
	return new Promise((resolve, reject) => {
		activityBillItemModel.create(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve();
			}
		);
	});
};

/* update the [total_cost] of 'activity_bill' */
/* params = {id, total_cost_change} */
const generateUpdateActivityBillPromise = (params) => {
	return new Promise((resolve, reject) => {
		activityBillModel.updateTotalCostAndLastModifyTimeById(params,
			(err, results) => {
				if (err) {
					return reject(err);
				}

				resolve();
			}
		);
	});
};


const activityBillItemService = {
	/* params = {activity_bill_id, description, cost, note} */
	/* callback: (err, results = {}) */
	createActivityBillItem: (params, callback) => {
		// TODO verify params


		/*
		 a) create a new 'activity_bill_item'
		 b) update the [total_cost] of 'activity_bill'
		 */
		generateCreateActivityBillItemPromise(params)
			.then(() => {
				return generateUpdateActivityBillPromise({id: params.activity_bill_id, total_cost_change: params.cost});
			})
			.then((result) => {
				callback(null, null);
			})
			.catch((err) => {
				return callback(err, null);
			});
	},
};

module.exports = activityBillItemService;
