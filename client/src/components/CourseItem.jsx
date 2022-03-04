import {
  Heading,
  useToast,
  useDisclosure,
  Button,
  Flex,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import UpdateModal from './UpdateModal'
import AddModal from './AddModal'

const CourseItem = ({ course, getAllCourses }) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDeleteCourse = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${course._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      toast({
        title: 'Deleted success',
        description: `Course ${course.name} has deleted`,
        status: 'success',
        position: 'top-left',
        duration: 3000,
      })
      getAllCourses()
    } catch (err) {
      toast({
        title: err.message,
        description: `Cannot delete this course id`,
        status: 'error',
        position: 'top-left',
        duration: 3000,
      })
    }
  }
  return (
    <>
      <UpdateModal
        getAllCourses={getAllCourses}
        prevCourse={course}
        isOpen={isOpen}
        onClose={onClose}
      />
      <AddModal />
      <Flex
        position="relative"
        flexDirection="column"
        gap={2}
        bgColor="blue.100"
        rounded="base"
        p={4}
      >
        <Flex alignItems="center" gap={2}>
          <Heading
            bgColor="blue.400"
            color="white"
            fontSize="md"
            fontWeight="normal"
            rounded="base"
            minW="16"
            textAlign="center"
            p={1}
          >
            Code
          </Heading>
          <Heading fontSize="md" fontWeight="normal">
            {course.code}
          </Heading>
        </Flex>
        <Flex alignItems="center" gap={2}>
          <Heading
            bgColor="blue.500"
            color="white"
            fontSize="md"
            fontWeight="normal"
            rounded="base"
            minW="16"
            textAlign="center"
            p={1}
          >
            Name
          </Heading>
          <Heading
            fontSize={{ sm: 'lg', lg: '2xl' }}
            fontWeight="normal"
            maxW={{ sm: 60, md: 'full' }}
          >
            {course.name}
          </Heading>
        </Flex>
        <Flex
          transform={'auto'}
          translateY="-50%"
          right={4}
          top="50%"
          position="absolute"
          flexDirection="column"
          gap={2}
        >
          <Button onClick={onOpen} size="xs">
            Edit <EditIcon ml={2} />
          </Button>
          <Button onClick={handleDeleteCourse} size="xs">
            Delete <DeleteIcon ml={2} />
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default CourseItem
