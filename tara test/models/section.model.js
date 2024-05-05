
module.exports = (connection, Sequelize) => {
    const Section = connection.define('section', {
        s_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        draft: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        status: {//public|| private
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }

    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['s_id']
            },
        ],
    })
    return Section
}