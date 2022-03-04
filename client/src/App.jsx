import { useState, useEffect } from 'react'
import { Button, Flex, useDisclosure, Heading } from '@chakra-ui/react'
import CourseItem from './components/CourseItem'
import { AddIcon } from '@chakra-ui/icons'
import AddModal from './components/AddModal'

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [courses, setCourses] = useState([])

  const getAllCourses = () => {
    fetch('http://localhost:5000/api/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data))
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
          Courses📜
        </Heading>
        <Flex w="full" justifyContent="flex-end" my={4}>
          <Button onClick={onOpen} colorScheme="green">
            Add Course
            <AddIcon ml="2" />
          </Button>
        </Flex>
        <Flex w="full" flexDirection="column" gap={4}>
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

export default App
