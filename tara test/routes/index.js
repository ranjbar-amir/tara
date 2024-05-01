module.exports = (app) => {


    const user = require('./user.routes')(app)
    const qa = require('./qa.routes')(app)
    const topic = require('./topic.routes')(app)
    const section = require('./section.routes')(app)
    const sectionTopic = require('./sectionTopic.routes')(app)
    const topicQa = require('./topicQa.routes')(app)
    const userQa = require('./userQa.routes')(app)
    
}
