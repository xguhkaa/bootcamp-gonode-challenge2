const path = require('path')

class FileController {
  show (req, res) {
    const { fileName } = req.params

    const foundFile = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      fileName
    )

    res.sendFile(foundFile)
  }
}

module.exports = new FileController()
