const controller = require('../controllers/section.controller')
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


	app.post('/section/add', [auth.verifyToken,admin.isAdmin], controller.add)
	app.put('/section/edit/:s_id', [auth.verifyToken,admin.isAdmin], controller.edit)
	app.delete('/section/delete/:s_id', [auth.verifyToken,admin.isAdmin], controller.delete)
	app.get('/section/info/:s_id', [auth.verifyToken,admin.isAdmin], controller.info)
	app.get('/section/list', [auth.verifyToken], controller.list)

}