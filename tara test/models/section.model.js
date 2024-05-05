
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
            validate: {
                len: [4, 500],
                notNull: {
                    msg: 'Please enter your draft',
                },
            }
        },
        status: {
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