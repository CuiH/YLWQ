/**
 * Created by CuiH on 2017/4/4.
 */

const express = require('express');

const newsService = require('../../service/newsService');

const value = require('../../config/value');


const newsRoute = express.Router();

newsRoute.get('/get_latest_eight',
	(req, res, next) => {
		newsService.getLatestEightNews({})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("latest news was queried.");
			})
			.catch(err => next(err));
	}
);

newsRoute.get('/:news_id',
	(req, res, next) => {
		newsService.getNewsById({id: req.params.news_id})
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a news was queried.");
			})
			.catch(err => next(err));
	}
);

module.exports = newsRoute;

