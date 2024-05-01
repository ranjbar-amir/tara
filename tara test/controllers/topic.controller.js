const Topic = require('../models').topic;
const resMessage = require('../config/responseMessage.config');
const db = require('../models')
const Connection = db.connection

// localhost:8888/topic/add
// method post
exports.add = async (_req, _res) => {

    if (_req.body.name) {
        try {

            const topic = await Topic.create(_req.body)
            _res.send({ message: resMessage.OK_200.success, topic })

        } catch (error) {

            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
        }
    }
    else {
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
    }
}


// localhost:8888/topic/edit/:s_id
// method put
exports.edit = async (_req, _res) => {
    try {
        await Topic.update(_req.body, { where: { t_id: _req.params.t_id } })
        _res.send({ message: resMessage.OK_200.success })
    } catch (error) {
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}


// localhost:8888/topic/delete/:s_id
// method delete
exports.delete = async (_req, _res) => {
    try {
        await Topic.destroy({ where: { t_id: _req.params.t_id } })
        _res.send({ message: resMessage.OK_200.success })
    } catch (error) {
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}

// localhost:8888/topic/list
// method get
exports.list = async (_req, _res) => {

    let where;
    _req.query.order == 1 ? where = "order by s_id ASC" : where = "order by s_id DESC"

    await Connection.query(`SELECT * FROM topic left join sectiontopic on topic.t_id=sectiontopic.t_id ${where}`,
    {type:db.Sequelize.QueryTypes.SELECT})

        .then(_result => {

            if (_result.length > 0)
                _res.status(200).send(_result)

            else
                _res.status(200).send([])
        })
        .catch((error) => {
            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error, error })
        })
}

// localhost:8888/topic/info/:t_id
// method get
exports.info = async (_req, _res) => {
    try {

        let topic = await Topic.findOne({ where: { t_id: _req.params.t_id } })
        _res.send({ message: resMessage.OK_200.success, topic })

    } catch (error) {
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}
