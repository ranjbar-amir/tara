const controller = require('../controllers/userQa.controller')
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')


module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, Content-Type, Accept'
		)
		req.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
		next()
	})


	app.post('/userqa/add', [auth.verifyToken, admin.isAdmin], controller.add)
	app.delete('/userqa/delete', [auth.verifyToken, admin.isAdmin], controller.delete)

}