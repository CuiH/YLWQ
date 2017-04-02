const query = require('../util/mysqlPool');

const clubBulletinSql = require('../sql/clubBulletinSql');


const clubBulletinModel = {
	/* params = {publisher_user_id, title, content, club_id} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			let now = new Date();
			query(clubBulletinSql.insert, [params.publisher_user_id, params.title, params.content, params.club_id, now],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});

	},

	/* params = {club_id} */
	findLatestOneByClubId: (params) => {
		return new Promise((resolve, reject) => {
			query(clubBulletinSql.selectLatestOneByClubId, [params.club_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});

	},

	/* params = {club_id} */
	findAllByClubId: (params) => {
		return new Promise((resolve, reject) => {
			query(clubBulletinSql.selectAllByClubId, [params.club_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});

	}
};

module.exports = clubBulletinModel;
