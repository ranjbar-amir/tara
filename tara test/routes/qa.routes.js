const controller = require('../controllers/qa.controller')
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')


module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, Content-Type, Accept'
		)
		req.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
		// req.existToken=!! req.token
		next()
	})

	app.post('/qa/add', [auth.verifyToken, admin.isAdmin], controller.add)
	app.put('/qa/edit/:qa_id', [auth.verifyToken, admin.isAdmin], controller.edit)
	app.delete('/qa/delete/:qa_id', [auth.verifyToken, admin.isAdmin], controller.delete)
	app.get('/qa/info/:qa_id', [auth.verifyToken], controller.info)
	app.get('/qa/list', [auth.verifyToken], controller.list)
	app.put('/qa/like/:qa_id/:like', [auth.verifyToken], controller.like)
	app.get('/qa/search', [auth.verifyToken], controller.search)//have query param
	app.get('/qa/listbyviewCount', [auth.verifyToken], controller.listByViewCount)//return list order by view count
	app.get('/qa/listbyviewCount', [ auth.verifyToken], controller.listByViewCount)//return list order by view count
}