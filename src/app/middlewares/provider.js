module.exports = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.provider) { return next() }
  return res.redirect('/app/dashboard/index')
}