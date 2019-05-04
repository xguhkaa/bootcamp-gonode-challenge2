const { User, Appointment } = require('../models')

class ProviderController {
  async create (req, res) {
    const foundProvider = await User.findByPk(req.params.providerId)
    return res.render('appointments/create', { provider: foundProvider })
  }

  async store (req, res) {
    const { providerId } = req.params
    const { id } = req.session.user
    const { scheduleDate } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: providerId,
      date: scheduleDate
    })

    return res.redirect('/app/dashboard')
  }
}

module.exports = new ProviderController()
