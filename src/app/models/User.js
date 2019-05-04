const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeSave: async user => {
          const { password } = user
          if (password) {
            user.password_hash = await bcrypt.hash(password, 8)
          }
        }
      }
    }
  )

  User.prototype.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password_hash)
  }

  return User
}
