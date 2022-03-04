const mongoose = require('mongoose')

const connectDB = async (MONGO_URI) => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Db Connected')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB
