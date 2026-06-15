const mongoose = require('mongoose')
const URL = process.env.MONGO_URI

mongoose.connect(URL)
  .then(() => {
    console.log("MongoDB Connected")
  })
  .catch(err => {
    console.log("ERROR NAME:", err.name)
    console.log("ERROR MESSAGE:", err.message)
    console.log("FULL ERROR:", err)
  })
mongoose.Promise = global.Promise

const db = mongoose.connection
db.on('error', console.error.bind(console, 'DB ERROR: '))

module.exports = {db, mongoose}