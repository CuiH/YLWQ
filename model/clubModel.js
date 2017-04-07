const query = require('../util/mysqlPool');

const clubSql = require('../sql/clubSql');
const userClubJoinSql = require('../sql/userClubJoinSql');


const clubModel = {
	/* params = {founder_user_id, name, brief_intro} */
	create: (params) => {
		return new Promise((resolve, reject) => {
			query(clubSql.insert, [params.founder_user_id, params.name, params.brief_intro],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {id} */
	findOneById: (params) => {
		return new Promise((resolve, reject) => {
			query(userClubJoinSql.selectOneByClubId, [params.id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});

	},

	/* params = {user_id} */
	findAllByUserId: (params) => {
		return new Promise((resolve, reject) => {
			query(userClubJoinSql.selectAllByUserId, [params.user_id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {part_name} */
	findAllByPartName: (params) => {
		return new Promise((resolve, reject) => {
			query(clubSql.selectAllByPartName, ['%' + params.part_name + '%'],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {id, brief_intro} */
	updateOneById: (params) => {
		return new Promise((resolve, reject) => {
			query(clubSql.updateOneById, [params.brief_intro, params.id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {id} */
	increaseMemberNumberByOneById: (params) => {
		return new Promise((resolve, reject) => {
			query(clubSql.increaseMemberNumberByOneById, [params.id],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

	/* params = {} */
	findHottestThree: (params) => {
		return new Promise((resolve, reject) => {
			query(clubSql.selectHottestThree, [],
				(err, results, fields) => {
					if (err) {
						return reject(err);
					}

					resolve(results);
				}
			);
		});
	},

};

module.exports = clubModel;
