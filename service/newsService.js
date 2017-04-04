/**
 * Created by CuiH on 2017/4/4.
 */

const newsModel = require('../model/newsModel');


const newsService = {
	/* params = {id} */
	/* results = {news} */
	getNewsById: (params) => {
		/*
		 a) get 'news' by [id]
		 */
		let user = null;
		return newsModel.findOneById(params)
			.then((results) => {
				return {news: results[0]};
			})
	},

	/* params = {} */
	/* results = {news} */
	getLatestEightNews: (params) => {
		/*
		 a) get latest eight 'news'
		 */
		let user = null;
		return newsModel.findLatestEight(params)
			.then((results) => {
				return {news: results};
			})
	},
};

module.exports = newsService;

