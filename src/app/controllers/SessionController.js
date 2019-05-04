const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body
    const foundUser = await User.findOne({ where: { email } })

    if (!foundUser) {
      req.flash('error', 'User not found')
      return res.redirect('/')
    }

    if (!(await foundUser.checkPassword(password))) {
      req.flash('error', ' Password incorrect')
      return res.redirect('/')
    }

    req.session.user = foundUser

    if (!foundUser.provider) return res.redirect('/app/dashboard/index')

    return res.redirect('/app/dashboard/provider')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
