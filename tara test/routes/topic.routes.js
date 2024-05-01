const controller = require('../controllers/topic.controller')
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

	app.post('/topic/add', [auth.verifyToken, admin.isAdmin], controller.add)
	app.put('/topic/edit/:t_id', [auth.verifyToken, admin.isAdmin], controller.edit)
	app.delete('/topic/delete/:t_id', [auth.verifyToken, admin.isAdmin], controller.delete)
	app.get('/topic/info/:t_id', [auth.verifyToken, admin.isAdmin], controller.info)
	app.get('/topic/list/', [auth.verifyToken], controller.list)
	
}