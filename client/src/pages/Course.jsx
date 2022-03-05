import {
  Flex,
  Heading,
  Text,
  Button,
  Box,
  useDisclosure,
} from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AddReviewModal from '../components/AddReviewModal'

const Course = () => {
  const [specificCourse, setSpecificCourse] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { id } = useParams()
  const MotionFlex = motion(Flex)

  const genStar = () => {
    const stars = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐']
    return stars[Math.floor(Math.random() * stars.length)]
  }

  const getSpecificCourse = async () => {
    setIsLoading(true)
    const response = await fetch(`http://localhost:5000/api/courses/${id}`)
    const course = await response.json()
    setSpecificCourse(course)
    setIsLoading(false)
  }

  useEffect(() => {
    getSpecificCourse()
  }, [])

  return (
    <>
      <AddReviewModal
        isOpen={isOpen}
        onClose={onClose}
        getSpecificCourse={getSpecificCourse}
      />
      <MotionFlex
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        maxWidth="container.md"
        margin="auto"
        pb={4}
        px={{ base: 4, md: 0 }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {Object.keys(specificCourse).length !== 0 && (
          <>
            <Flex justifyContent="center" flexDir="column" alignItems="center">
              <Heading mt={4} fontWeight="medium">
                Course code - {specificCourse.code}
              </Heading>
              <Heading mt={4} fontWeight="medium">
                Course name - {specificCourse.name}
              </Heading>
            </Flex>
          </>
        )}
        <Flex
          borderTop="1px"
          borderColor="gray.300"
          flexDirection="column"
          mt={4}
        >
          {specificCourse.reviews?.map((review) => (
            <Flex
              p={6}
              w="25rem"
              borderBottom="1px"
              borderX="1px"
              borderColor="gray.300"
              pos={'relative'}
              key={review}
              flexDirection="column"
              gap={4}
            >
              <Text>{genStar()}</Text>
              <Text>{review}</Text>
            </Flex>
          ))}
        </Flex>
        {!isLoading && (
          <Flex gap={4}>
            <Box mt={4}>
              <Button onClick={onOpen} colorScheme="green">
                Add Review
              </Button>
            </Box>
            <Link to="/" style={{ marginTop: '1rem' }}>
              <Button>Back To Home</Button>
            </Link>
          </Flex>
        )}
      </MotionFlex>
    </>
  )
}

export default Course
