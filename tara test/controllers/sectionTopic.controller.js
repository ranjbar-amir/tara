const resMessage = require('../config/responseMessage.config');
const db = require('../models')
const Connection = db.connection


// localhost:8888/sectionTopic/add
// method post
exports.add = async (_req, _res) => {
    if (_req.body.s_id && _req.body.t_id) {
        try {

            await Connection.query(`INSERT INTO sectiontopic (s_id, t_id,createdAt,updatedAt)
            VALUES ('${_req.body.s_id}', '${_req.body.t_id}',CURDATE(),CURDATE())`)

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
      
        await Connection.query(`DELETE FROM sectiontopic WHERE 
         s_id='${_req.body.s_id}' and t_id='${_req.body.t_id}'`)

        _res.send({ message: resMessage.OK_200.success })

    } catch (error) {
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}
















