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

const AddModal = ({ isOpen, onClose, getAllCourses }) => {
  const toast = useToast()
  const initialRef = useRef()
  const finalRef = useRef()
  const [form, setForm] = useState({
    code: '',
    name: '',
  })

  const onSubmit = async () => {
    try {
      if (form.code && form.name) {
        const response = await fetch('http://localhost:5000/api/courses/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message)
        }
        toast({
          title: 'Course created success',
          description: "We've created course for you",
          status: 'success',
          duration: 5000,
          position: 'top-left',
        })
        setForm({
          code: '',
          name: '',
        })
        onClose()
        getAllCourses()
      }
    } catch (err) {
      console.log(err)
      toast({
        title: err.message,
        description: 'Please type another code course',
        status: 'error',
        duration: 3000,
        position: 'top-left',
      })
    }
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
        <ModalHeader>Add new course</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Code</FormLabel>
            <Input
              value={form.code}
              onChange={handleChange}
              ref={initialRef}
              placeholder="Code"
              name="code"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Name</FormLabel>
            <Input
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              name="name"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onSubmit} colorScheme="blue" mr={3}>
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddModal
