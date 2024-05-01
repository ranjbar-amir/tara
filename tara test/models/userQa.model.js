
module.exports = (connection, Sequelize) => {
  const UserQa = connection.define('userQa', {
    u_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    qa_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    isLiked: {
      type: Sequelize.BOOLEAN,
    },   

  },)
  return UserQa
}