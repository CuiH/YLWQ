/**
 * Created by CuiH on 2017/4/6.
 */

const challengeModel = require('../model/challengeModel');


const challengeService = {
	/* params = {challenger_user_id, activity_bill_id, message} */
	/* results = {challengeId} */
	createChallenge: (params) => {
		/*
		 a) create a new 'challenge'
		 */
		let userId = null;
		return challengeModel.create(params)
			.then((result) => {
				return {challengeId: result.insertId};
			});
	},

	/* params = {activity_bill_id} */
	/* results = {challenges} */
	getAllChallengesByActivityBillId: (params) => {
		/*
		 a) get all 'challenge' by [activity_bill_id]
		 */
		return challengeModel.findAllByActivityBillId(params)
			.then((results) => {
				return {challenges: results};
			});
	},

	/* params = {id} */
	/* results = {} */
	deleteChallengeById: (params) => {
		/*
		 a) delete 'challenge' by [id]
		 */
		let user = null;
		return challengeModel.deleteOneById(params)
			.then((results) => {
				return {};
			});
	},
};

module.exports = challengeService;

