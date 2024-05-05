const connection = require('../config/connection.config')
const Sequelize = require('sequelize')
const db = {}
db.Sequelize = Sequelize
db.Op = Sequelize.Op
db.connection = connection


db.section = require('./section.model')(connection, Sequelize);
db.topic = require('./topic.model')(connection, Sequelize);
db.qa = require('./qa.model')(connection, Sequelize);
db.user = require('./user.model')(connection, Sequelize);
db.qaUser = require('./userQa.model')(connection, Sequelize);



//relation section section and topic 
db.section.belongsToMany(db.topic, {
  foreignKey: 's_id',
  through: 'sectionTopic',
  // onDelete: 'CASCADE',
  as: 'stopics'
})

db.topic.belongsToMany(db.section, {
  foreignKey: 't_id',
  through: 'sectionTopic',
  // onDelete: 'CASCADE',
  as: 'sections'
})


//relation between qa and topic 
db.qa.belongsToMany(db.topic, {
  foreignKey: 'qa_id',
  through: 'topicQa',
 // onDelete: 'CASCADE'

})

db.topic.belongsToMany(db.qa, {
  foreignKey: 't_id',
  through: 'topicQa',
 // onDelete: 'CASCADE'

})


//relation between user and qa
db.user.belongsToMany(db.qa, {
  foreignKey: 'u_id',
  through: 'userQa',

})

db.qa.belongsToMany(db.user, {
  foreignKey: 'qa_id',
  through: 'userQa',

})


module.exports = db