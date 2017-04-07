/**
 * Created by CuiH on 2017/4/7.
 */

const userPaymentModel = require('../model/userPaymentModel');


const userPaymentService = {
	/* params = {user_id} */
	/* results = {userPayments} */
	getAllUserPaymentsByUserId: (params) => {
		/*
		 a) get all 'user_payment' by [user_id]
		 */
		return userPaymentModel.findAllByUserId(params)
			.then((results) => {
				return {userPayments: results};
			})
	},

};

module.exports = userPaymentService;
