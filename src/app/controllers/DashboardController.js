const { User, Appointment } = require('../models')
const moment = require('moment')
const { Op } = require('sequelize')

class DashboardController {
  async indexProviders (req, res) {
    const foundProviders = await User.findAll({
      where: {
        provider: true,
        id: {
          [Op.ne]: req.session.user.id
        }
      }
    })
    return res.render('dashboard/index', { providers: foundProviders })
  }

  async indexClients (req, res) {
    const foundClients = await Appointment.findAll({
      include: [
        {
          model: User,
          required: true,
          attributes: ['name', 'email', 'avatar']
        }
      ],
      order: [['date', 'ASC']],
      attributes: ['date'],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      }
    })

    const formattedClients = foundClients.map(({ User, date }) => ({
      email: User.email,
      avatar: User.avatar,
      name: User.name,
      date: moment(date).format('hh:mm a')
    }))

    return res.render('dashboard/provider', { clients: formattedClients })
  }
}

module.exports = new DashboardController()
