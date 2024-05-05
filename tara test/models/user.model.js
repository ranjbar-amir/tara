
module.exports = (connection, Sequelize) => {
    const User = connection.define('user', {
        u_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [4, 15],
                notNull: {
                    msg: 'Please enter your name',
                },
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [4, 15],
                notNull: {
                    msg: 'Please enter your password',
                },
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            notNull: {
                msg: 'Please enter your email',
            },
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,

        },
        isActive: {
            type: Sequelize.ENUM({
                values: ['initial', 'active', 'notactive']
            },
            ),
            validate: {
                isIn: [['initial', 'active', 'notactive']]
            }
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