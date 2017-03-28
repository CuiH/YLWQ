const dataChecking = {
	bodyChecking: (expectedFields) => {
		return function(req, res, next) {
			for (let field in expectedFields) {
				if (!Object.prototype.hasOwnProperty.call(req.body, field)) {
					return next(new Error("field '" + field + "' is not provided"));
				} else if (req.body[field] == null || req.body[field] == "") {
					return next(new Error("field '" + field + "' is not valid"));
				} else if (req.body[field].length > expectedFields[field]) {
					return next(new Error("field '" + field + "' is not valid"));
				}
			}

			next();
		}
	},

	queryChecking: (expectedFields) => {
		return function(req, res, next) {
			for (let field in expectedFields) {
				if (!Object.prototype.hasOwnProperty.call(req.query, field)) {
					return next(new Error("field '" + field + "' is not provided"));
				} else if (req.query[field] == null || req.query[field] == "") {
					return next(new Error("field '" + field + "' is not valid"));
				} else if (req.query[field].length > expectedFields[field]) {
					return next(new Error("field '" + field + "' is not valid"));
				}
			}

			next();
		}
	}
};

module.exports = dataChecking;
