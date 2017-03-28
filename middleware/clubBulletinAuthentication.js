const clubModel = require('../model/clubModel');
const userClubMapModel = require('../model/userClubMapModel');

const value = require('../config/value');


const clubBulletinAuthentication = {
	/* check if the 'user' is a member of the 'club' that owns the 'club_bulletin', and if the 'club_bulletin' exists */
	/* params = {user_id, club_bulletin_id} */
	readAccess: (req, res, next) => {
		userClubMapModel.findOneByUserIdAndClubBulletinId({
				user_id: req.user.id,
				club_bulletin_id: req.query.club_bulletin_id ? req.query.club_bulletin_id : req.params.club_bulletin_id
			}, (err, results) => {
				if (err) {
					return next(err);
				}

				if (results.length == 0) {
					return next(new Error('no access.'));
				}

				next();
			}
		);
	},
};

module.exports = clubBulletinAuthentication;
