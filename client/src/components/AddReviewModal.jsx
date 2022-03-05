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
import { useParams } from 'react-router-dom'
import { useRef, useState } from 'react'

const AddReviewModal = ({ isOpen, onClose, getSpecificCourse }) => {
  const { id } = useParams()
  const toast = useToast()
  const initialRef = useRef()
  const finalRef = useRef()
  const [reviewMessage, setReviewMessage] = useState('')

  const onSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${id}/new-review`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reviewMessage }),
        },
      )
      const data = await response.json()
      onClose()
      getSpecificCourse()
      setReviewMessage('')
      toast({
        title: data.message,
        description: 'Added Review Success',
        status: 'success',
        position: 'top-right',
        duration: 3000,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={() => {
        onClose()
        setReviewMessage('')
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new review</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Review</FormLabel>
            <Input
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              ref={initialRef}
              placeholder="Message"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onSubmit} colorScheme="blue" mr={3}>
            Submit
          </Button>
          <Button
            onClick={() => {
              onClose()
              setReviewMessage('')
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddReviewModal
