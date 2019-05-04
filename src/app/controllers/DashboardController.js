const { User } = require('../models')

class DashboardController {
  async indexProviders (req, res) {
    const foundProviders = await User.findAll({ where: { provider: true } })
    return res.render('dashboard/index', { providers: foundProviders })
  }

  async indexClients (req, res) {
    return res.render('dashboard/provider')
  }
}

module.exports = new DashboardController()
