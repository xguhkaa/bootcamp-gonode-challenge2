const moment = require('moment')
const { Appointment } = require('../models')
const { Op } = require('sequelize')

class AvailableController {
  async index (req, res) {
    const selectedDate = moment(parseInt(req.query.date))
    const selectedProviderId = req.params.providerId

    const scheduledAppointmentsAlongTheSelectedDay = await Appointment.findAll({
      where: {
        provider_id: selectedProviderId,
        date: {
          [Op.between]: [
            selectedDate.startOf('day').format(),
            selectedDate.endOf('day').format()
          ]
        }
      }
    })

    const workSchedules = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00'
    ]

    const schedules = workSchedules.map(workSchedule => {
      const [hour, minute] = workSchedule.split(':')
      const workScheduleInMomentFormat = selectedDate
        .hour(hour)
        .minute(minute)
        .second(0)

      return {
        workSchedule,
        fomattedWorkSchedule: workScheduleInMomentFormat.format(),
        available:
          workScheduleInMomentFormat.isAfter(moment()) &&
          !scheduledAppointmentsAlongTheSelectedDay.find(
            appointment =>
              moment(appointment.date).format('HH:mm') === workSchedule
          )
      }
    })

    return res.render('available/index', { schedules })
  }
}

module.exports = new AvailableController()
