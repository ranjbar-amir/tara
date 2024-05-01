
module.exports = (connection, Sequelize) => {
    const Topic = connection.define('topic', {
        t_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

   

    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['t_id']
            },
        ],
    })
    return Topic
}