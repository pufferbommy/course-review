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
  reviews: {
    type: Array,
  },
})

module.exports = Course = model('courses', CourseSchema)
