import { useState, useEffect } from 'react'
import {
  Button,
  Flex,
  useDisclosure,
  Heading,
  Box,
  Image,
} from '@chakra-ui/react'
import CourseItem from '../components/CourseItem'
import { AddIcon } from '@chakra-ui/icons'
import AddModal from '../components/AddModal'
import CourseImg from '../assets/course.jpg'

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllCourses = async () => {
    setIsLoading(true)
    const response = await fetch('http://localhost:5000/api/courses')
    const data = await response.json()
    setCourses(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllCourses()
  }, [])

  return (
    <>
      <AddModal
        isOpen={isOpen}
        onClose={onClose}
        getAllCourses={getAllCourses}
      />
      <Flex
        maxWidth="container.md"
        margin="auto"
        pb={4}
        px={{ base: 4, md: 0 }}
        flexDirection="column"
        alignItems="center"
      >
        <Heading mt={4} fontWeight="medium">
          Courses
        </Heading>
        <Box w="full" mt={4}>
          <Image
            h={'48'}
            rounded="md"
            w="full"
            objectFit="cover"
            src={CourseImg}
          />
        </Box>
        <Flex w="full" alignItems="end" justifyContent="space-between" my={4}>
          <Heading size="md" color="gray.700">
            Total courses: {courses.length}
          </Heading>
          <Button onClick={onOpen} colorScheme="green">
            Add Course
            <AddIcon ml="2" />
          </Button>
        </Flex>
        <Flex w="full" flexDirection="column" gap={4}>
          {courses.length === 0 && !isLoading && (
            <Box textAlign="center" color="gray.500">
              No course here.
            </Box>
          )}
          {courses.map((course) => (
            <CourseItem
              key={course._id}
              course={course}
              getAllCourses={getAllCourses}
            />
          ))}
        </Flex>
      </Flex>
    </>
  )
}

export default Home
