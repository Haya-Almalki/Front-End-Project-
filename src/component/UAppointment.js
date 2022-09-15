import React from 'react';
import PersonalImg from "./PersonalImg";
import { useState } from "react";
import {
    Button, Td, Tr, Modal,
    ModalOverlay, Textarea,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton, FormControl, Input, FormLabel, useDisclosure
} from '@chakra-ui/react'


function UAppointment() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)

    const [value, setValue] = useState(5);
    const [review, setReview] = useState("");
    const handleReview = (event) => setReview(event.target.value)
    const handleRating = (event) => setValue(event.target.value)
    const AddReview=async (e) => {
        console.log(review);
        console.log(value);
    }
    
    const finalRef = React.useRef(null)
    return (
        <Tr>
            <Td><PersonalImg /> </Td>
            <Td>Haya</Td>
            <Td>2022-09-24</Td>
            <Td>5</Td>
            <Td>I would like somebody ........</Td>
            <Td>
                <Button colorScheme='teal' variant='outline'
                    onClick={onOpen}
                >
                    Add Review
                </Button>

                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}

                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Review:</FormLabel>
                                <Textarea ref={initialRef} placeholder='Enter your review' onChange={handleReview} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Rate:</FormLabel>
                                <Input type="number" defaultValue={5} min={1} max={5} onChange={handleRating}>
                                    
                                </Input>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={AddReview}>
                                Send
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Td>

        </Tr>


    );
}

export default UAppointment;