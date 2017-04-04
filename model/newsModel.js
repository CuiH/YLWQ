/**
 * Created by CuiH on 2017/4/4.
 */

const query = require('../util/mysqlPool');

const newsSql = require('../sql/newsSql');


const newsModel = {
	/* params = {content, title, author} */
	create: (params, callback) => {
		return new Promise((resolve, reject) => {
			query(newsSql.insert, [params.author, params.title, params.content],
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
			query(newsSql.selectOneById, [params.id],
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
	findLatestEight: (params) => {
		return new Promise((resolve, reject) => {
			query(newsSql.selectLatestEight, [],
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

module.exports = newsModel;
