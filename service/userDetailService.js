/**
 * Created by CuiH on 2017/4/7.
 */

const userModel = require('../model/userModel');
const userDetailModel = require('../model/userDetailModel');


const userDetailService = {
	/* params = {id} */
	/* results = {user} */
	getUserDetailById: (params) => {
		/*
		 a) get 'user' by [id]
		 b) get 'user_detail' by [id]
		 */
		let user = null;
		return userModel.findOneById2(params)
			.then((results) => {
				user = results[0];

				return userDetailModel.findOneById(params);
			})
			.then((results) => {
				if (results.length == 0) {
					return {user: null};
				}

				user.userDetail = results[0];

				return {user: user};
			});
	},

	/* params = {id, gender, description, birthdate} */
	/* results = {} */
	updateUserDetailById: (params) => {
		/*
		 a) update 'user_detail' by [id]
		 */
		let user = null;
		return userDetailModel.updateOneById(params)
			.then(() => {
				return {};
			});
	},

};

module.exports = userDetailService;
