
module.exports = (connection, Sequelize) => {
    const User = connection.define('user', {
        u_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,

        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,

        }, 
        isActive: {
            type: Sequelize.BOOLEAN,

        },


    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['u_id']
            },
        ],
    })
    return User
}