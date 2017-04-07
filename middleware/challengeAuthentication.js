/**
 * Created by CuiH on 2017/4/6.
 */

const challengeModel = require('../model/challengeModel');

const value = require('../config/value');


const challengeAuthentication = {
	/* check if the 'user' is the creator of the 'challenge', and if the 'challenge' exists */
	/* params = {id} */
	deleteAccess: (req, res, next) => {
		challengeModel.findOneById({id: req.body.challenge_id})
			.then((results) => {
				if (results.length == 0 || results[0].challenger_user_id != req.user.id) {
					return next(new Error('no saccess.'));
				}

				next();
			}).catch(err => next(err));
	}
};

module.exports = challengeAuthentication;

