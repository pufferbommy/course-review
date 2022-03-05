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

const AddReviewModal = ({ isOpen, onClose }) => {
  const toast = useToast()
  const initialRef = useRef()
  const finalRef = useRef()
  const [reviewMessage, setReviewMessage] = useState('')

  const onSubmit = async () => {
    try {
    } catch (err) {}
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
