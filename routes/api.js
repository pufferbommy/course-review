const express = require('express')
const router = express.Router()
const Course = require('../models/Course')

// Get all courses
router.get('/', async (req, res) => {
  const courses = await Course.find()
  res.json(courses)
})

// Get specific course
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const course = await Course.findOne({ _id: id })
    if (!course) {
      throw new Error("Don't have this course.")
    }
    res.status(200).json(course)
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

// Add a new course
router.post('/new', async (req, res) => {
  try {
    const { code } = req.body
    const existsCodeCourse = await Course.findOne({ code })
    if (existsCodeCourse) {
      throw new Error('Exists Code Course')
    }
    const course = await Course.create(req.body)
    res.status(201).json(course)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Delete the course
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const course = await Course.findOneAndDelete({ _id: id })
    if (!course) {
      throw new Error("This course isn't exist.")
    }
    res.status(200).json(course)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Edit the course
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { code, name } = req.body
    await Course.findOneAndUpdate({ _id: id }, { code, name }, { new: true })
    res.status(200).json({ message: 'Update Success' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
