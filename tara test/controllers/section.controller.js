const Section = require('../models').section;
const resMessage = require('../config/responseMessage.config');


// localhost:8888/section/add
// method post
exports.add = async (_req, _res) => {

    if (_req.body.draft ) {
        try {
          const section=  await Section.create(_req.body)
            _res.send({ message: resMessage.OK_200.success ,section})
        } catch (error) {
            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
        }
    }
    else {
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
    }
}


// localhost:8888/section/edit/:s_id
// method put
exports.edit = async (_req, _res) => {
    try {
        await Section.update(_req.body, { where: { s_id: _req.params.s_id } })
        _res.send({ message: resMessage.OK_200.success })
    } catch (error) {
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}


// localhost:8888/section/info/:s_id
// method get
exports.info = async (_req, _res) => {
    try {
     let section=   await Section.findOne({ where: { s_id: _req.params.s_id } })
        _res.send(section)
    } catch (error) {
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}


// localhost:8888/section/delete/:s_id
// method delete
exports.delete = async (_req, _res) => {
    try {
        await Section.destroy({ where: { s_id: _req.params.s_id } })
        _res.send({ message: resMessage.OK_200.success })
    } catch (error) {
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}

// localhost:8888/section/list
// method get
exports.list = (_req, _res) => {

    Section.findAll()
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

