const { model, Schema } = require('mongoose')

const CourseSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

module.exports = Course = model('courses', CourseSchema)
