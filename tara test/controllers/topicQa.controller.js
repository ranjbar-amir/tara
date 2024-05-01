
const resMessage = require('../config/responseMessage.config');
const db = require('../models')
const Connection = db.connection


// localhost:8888/sectionTopic/add
// method post
exports.add = async (_req, _res) => {

    if (_req.body.t_id && _req.body.qa_id) {
        try {

            await Connection.query(`INSERT INTO topicQa (t_id, qa_id,createdAt,updatedAt)
            VALUES ('${_req.body.t_id}', '${_req.body.qa_id}',CURDATE(),CURDATE())`)

            _res.send({ message: resMessage.OK_200.success })
        } catch (error) {

            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
        }
    }
    else {
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
    }
}


// localhost:8888/sectionTopic/delete/
// method delete
exports.delete = async (_req, _res) => {
    try {

        await Connection.query(`DELETE FROM topicQa WHERE 
         t_id='${_req.body.t_id}' and qa_id='${_req.body.qa_id}'`)

        _res.send({ message: resMessage.OK_200.success })

    } catch (error) {

        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}
