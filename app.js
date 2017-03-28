const express = require('express');
const path = require('path');

const userController = require('./controller/api/userController');
const clubController = require('./controller/api/clubController');
const activityController = require('./controller/api/activityController');
const clubBulletinController = require('./controller/api/clubBulletinController');
const applicationController = require('./controller/api/applicationController');
const notificationController = require('./controller/api/notificationController');
const activityBillController = require('./controller/api/activityBillController');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'pug');

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "x-access-token");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	next();
});


app.use('/api/user', userController);
app.use('/api/club', clubController);
app.use('/api/activity', activityController);
app.use('/api/club_bulletin', clubBulletinController);
app.use('/api/application', applicationController);
app.use('/api/notification', notificationController);
app.use('/api/activity_bill', activityBillController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	// res.locals.message = err.message;
	// res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	console.log(err);
	res.status(err.status || 500);
	res.json({result: "err", message: err.message});
});



module.exports = app;
