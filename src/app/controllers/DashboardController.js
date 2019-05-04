const { User } = require('../models')

class DashboardController {
  async index (req, res) {
    const foundProviders = await User.findAll({ where: { provider: true } })
    return res.render('dashboard', { providers: foundProviders })
  }
}

module.exports = new DashboardController()
