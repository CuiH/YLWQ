/**
 * Created by CuiH on 2017/4/7.
 */

const userAccountModel = require('../model/userAccountModel');


const userAccountService = {
	/* params = {id} */
	/* results = {userAccount} */
	getUserAccountById: (params) => {
		/*
		 a) get 'user_account' by [id]
		 */
		let user = null;
		return userAccountModel.findOneById(params)
			.then((results) => {
				return {userAccount: results[0]};
			})
	},

};

module.exports = userAccountService;
