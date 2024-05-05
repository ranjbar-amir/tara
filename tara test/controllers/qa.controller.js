
const QA = require('../models').qa;
const resMessage = require('../config/responseMessage.config');
const db = require('../models')
const Connection = db.connection
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
const User = db.user
// localhost:8888/qa/add
// method post
exports.add = async (_req, _res) => {

    if (_req.body.draft) {
        try {

            const qa = await QA.create(_req.body)
            _res.send({ message: resMessage.OK_200.success, qa })

        } catch (error) {
            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
        }
    }
    else {
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
    }
}


// localhost:8888/qa/edit/:qa_id
// method put
exports.edit = async (_req, _res) => {
    try {
        await QA.update(_req.body, { where: { qa_id: _req.params.qa_id } })
        _res.send({ message: resMessage.OK_200.success })
    } catch (error) {
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}


// localhost:8888/qa/delete/:qa_id
// method delete
exports.delete = async (_req, _res) => {
    try {
        await QA.destroy({ where: { qa_id: _req.params.qa_id } })
        _res.send({ message: resMessage.OK_200.success })
    } catch (error) {
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}

// localhost:8888/qa/list
// method get
exports.list = async (_req, _res) => {

    let where;
    _req.query.order == 1 ? where = "order by t_id ASC" : where = "order by t_id DESC"

    await Connection.query(`SELECT qa.* FROM qa left join topicqa on qa.qa_id=topicqa.qa_id  ${where}`,
        { type: db.Sequelize.QueryTypes.SELECT })
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

// localhost:8888/qa/info/:qa_id
// method get
exports.info = async (_req, _res) => {
    try {

        const result = await Connection.query(`
        select  distinct qa.*,
        (select Count(*) from qauser where qa_id='${_req.params.qa_id}' and  isLiked =true ) as liked,
     (select Count(*) from qauser where qa_id='${_req.params.qa_id}'  and  isLiked =false) as dislike ,
     (select Count(*) from qauser where qa_id='${_req.params.qa_id}'  ) as view 
      from qa inner join qauser on qauser.qa_id=qa.qa_id
      where qa.qa_id='${_req.params.qa_id}' 
      `)

        const user = await Connection.query(` select * from qaUser where u_id='${_req.userId}' `, {
            type: db.Sequelize.QueryTypes.SELECT,
        })

        if (user.length == 0) {
            await Connection.query(`INSERT INTO qaUser (qa_id, u_id,createdAt, updatedAt)
            VALUES ('${_req.params.qa_id}', '${_req.userId}',CURDATE(),CURDATE())`)
        }

        _res.send({ message: resMessage.OK_200.success, result })

    } catch (error) {
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}


// localhost:8888/qa/like
// method get
exports.like = async (_req, _res) => {

    try {

        const user = await Connection.query(` select * from qauser where u_id='${_req.userId}' and qa_id='${_req.params.qa_id}'`, {
            type: db.Sequelize.QueryTypes.SELECT,
        })

        if (user.length == 0) {

            await Connection.query(`INSERT INTO  qauser (qa_id, u_id,isLiked,createdAt,updatedAt)
            VALUES ('${_req.params.qa_id}', '${_req.userId}','${_req.params.like}',CURDATE(),CURDATE())`, {

            })

        } else {

            await Connection.query(`
            UPDATE  qauser
            SET isLiked = '${_req.params.like}'
            WHERE u_id='${_req.userId}' and qa_id='${_req.params.qa_id}'
             `, {

            })

        }

        _res.send({ message: resMessage.OK_200.success })

    } catch (error) {

        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}

// localhost:8888/qa/search
// method get
exports.search = async (_req, _res) => {
    try {

        if (_req.query.search) {

            const result = await Connection.query(`
            select * from qa where draft like '%${_req.query.search}%' and status=true`)

            return _res.send({ message: resMessage.OK_200.success, result })
        }
        else {
            return _res.status(500).send({ message: resMessage.BAD_REQUEST_400.error_input })
        }

    } catch (error) {
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}


// localhost:8888/qa/listByViewCount
// method get
exports.listByViewCount = async (_req, _res) => {

    let query = `select qa.*,section.s_id,section.status,
ifnull(viewCount,0) as viewCount ,
ifnull(likeCount,0) as likeCount,
ifnull(disLikeCount,0) as disLikeCount from qa 
left join topicqa on qa.qa_id = topicqa.qa_id
 inner join sectiontopic st on st.t_id= topicqa.t_id
 inner join section on section.s_id=st.s_id
 left outer join ( select count(*) as viewCount,qa_id from userqa group by qa_id) as v on  v.qa_id=qa.qa_id
 left outer join ( select count(*) as likeCount,qa_id  from userqa where isLiked = true group by qa_id) as l on l.qa_id=qa.qa_id
 left outer join ( select count(*) as disLikeCount,qa_id from userqa where isLiked <> true group by qa_id) as d on d.qa_id=qa.qa_id `


    const authHeader = _req.headers['authorization']
    if (authHeader && authHeader.toLowerCase().includes('bearer')) {
        const bearer = authHeader.split(' ')
        const bearerToken = bearer[1]
        _req.token = bearerToken
    }

    let token = _req.token

    if (!token) {
        await Connection.query(`${query} where section.status=true order by viewCount desc`,

            { type: db.Sequelize.QueryTypes.SELECT })
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
    else {

        jwt.verify(token, config.secret, async (err, decoded) => {
            if (err) {
                return _res.status(402).send({ message: 'دسترسی لازم وجود ندارد' })
            }

            await User.findOne({
                where: {
                    email: decoded.name.trim(),
                }
            })
                .then(async _result => {

                    if (_result) {


                        await Connection.query(query,
                            { type: db.Sequelize.QueryTypes.SELECT })
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
                    else {
                        return _res.status(401).send({ message: 'دسترسی لازم وجود ندارد' })
                    }

                }).catch(error => {
                    return _res.status(401).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
                })
        })





    }


}