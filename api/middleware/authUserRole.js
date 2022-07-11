const isAdmin = (req, res, next) => {
	if (req.user.role === 'admin') {
		return next();
	}
}

const isUser = (req, res, next) => {
	if (req.user.role === 'user') {
		return next();
	}
}

const isManager = (req, res, next) => {
	if (req.user.role === 'manager') {
		return next();
	}
}

module.exports = {
	isAdmin,
	isUser,
	isManager
}