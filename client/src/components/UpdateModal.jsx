import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

const UpdateModal = ({ isOpen, onClose, prevCourse, getAllCourses }) => {
  const toast = useToast()
  const [course, setCourse] = useState({
    code: prevCourse.code,
    name: prevCourse.name,
  })
  const initialRef = useRef()
  const finalRef = useRef()

  const onSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${prevCourse._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(course),
        },
      )
      const data = response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      toast({
        title: 'Update success',
        description: 'Update the course success',
        status: 'success',
        position: 'top-left',
        duration: 3000,
      })
      onClose()
      getAllCourses()
    } catch (err) {}
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit the course</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Code</FormLabel>
            <Input
              value={course.code}
              onChange={(e) =>
                setCourse((prev) => ({ ...prev, code: e.target.value }))
              }
              ref={initialRef}
              placeholder="Code"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Name</FormLabel>
            <Input
              value={course.name}
              onChange={(e) =>
                setCourse((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Name"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onSave} colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateModal
