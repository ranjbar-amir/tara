
const User = require('../models').user;
const db = require('../models')
const Op = db.Op
const resMessage = require('../config/responseMessage.config');
var jwt = require('jsonwebtoken');

// localhost:8888/user/add
// method post
exports.add = async (_req, _res) => {

    if (_req.body.name) {
        try {
            const user = await User.findAll({ where: { name: _req.body.name } })
            if (user.length > 0) {
                return _res.status(400).send({ message: resMessage.BAD_REQUEST_400.duplicate_record })
            }
            await User.create(_req.body)
            _res.send({ message: resMessage.OK_200.success })

        } catch (error) {
            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
        }
    }
    else {
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
    }
}

// localhost:8888/user/list
// method get
exports.list = (_req, _res) => {
    User.findAll()
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


// localhost:8888/user/login
// method post
exports.login = async (_req, _res) => {

    if (_req.body.name && _req.body.name.trim().length > 0 &&
        _req.body.password && _req.body.password.trim().length > 0) {


        await User.findOne({
            where: {
                [Op.or]: [{ name: _req.body.name }]
            }
        }).then(async (_result) => {
     

            if (_result) {


                var token = jwt.sign({ name: _req.body.name, id: _result.u_id, isAdmin: _result.isAdmin }, 'tara');


                _res.status(200).send({ message: resMessage.OK_200, token })
            }

        })
            .catch(error => {

                _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error, error })
            })
    }
    else
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
}