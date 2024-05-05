
module.exports = (connection, Sequelize) => {
    const QA = connection.define('qa', {
        qa_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        refId: {
            type: Sequelize.UUID,

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
                fields: ['qa_id']
            },
        ],
    })
    return QA
}