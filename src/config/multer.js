const multer = require('multer')
const crypt = require('crypto')
const path = require('path')

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callback) => {
      crypt.randomBytes(16, (error, randomBytes) => {
        if (error) return callback(error)

        callback(
          null,
          randomBytes.toString('hex') + path.extname(file.originalname)
        )
      })
    }
  })
}
