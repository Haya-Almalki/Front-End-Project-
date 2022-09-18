import React from 'react';
import PersonalImg from "./PersonalImg";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {
    Button, Td, Tr, Modal,
    ModalOverlay, Textarea,
    ModalContent, Heading,
    ModalFooter, Text,
    ModalBody, useToast,
    ModalCloseButton, FormControl, FormLabel, useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'


function UAppointment({ id, personId, datetime, hours, total, request, status,addReviews }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")

    const { isOpen: isOpenReview, onOpen: onOpenReview, onClose: onCloseReview } = useDisclosure()

    const initialRef = React.useRef(null)
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()

    const cancelRef = React.useRef()
    const [rate, setRate] = useState();
    const [review, setReview] = useState("");
    const handleReview = (event) => setReview(event.target.value)
    const toast = useToast()

    useEffect(() => {
        const fetchusername = async () => {
            const request = await fetch("http://localhost:8080/api/v1/user/username/" + personId, { method: 'POST' })
            const data = await request.json();
            setUsername(data.message)
        };
        fetchusername();
    }, []);
    var myHeaders = new Headers();
  //  myHeaders.append("Authorization", "Basic SGF5YTk2OkhoMTIzNDU2");
    //btoa("username:password")
    //aGF5YTExOkhoMTIzMTIz
    //SGF5YTk2OkhoMTIzNDU2
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "message": review,
        "rate": rate
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const AddReview = async (e) => {
        console.log(review);
        console.log(rate);
        const request = await fetch("http://localhost:8080/api/v1/review/addReview/" + id, requestOptions)
        const data = await request.json();

        if (data.status === 201) {
            onCloseReview()
            toast({
                title: data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position:'top',
                onCloseComplete: (() => window.location.reload()),
            })
        }
        else {
            onCloseReview()
            toast({
                title: data.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:'top',
                onCloseComplete: (() => window.location.reload()),
            })
        }

    }
    const ratingChanged = (newRating) => {
        setRate(newRating)
    };
    const finalRef = React.useRef(null)
    const updateAppointment = () => {

        navigate("/updateAppointment", {
            state: {
                appId: id
            }
        })
    }
    const deleteAppointment = async (e) => {
        const request = await fetch("http://localhost:8080/api/v1/appointment/delete/" + id, {
            method: 'DELETE',
            headers: myHeaders
        });
        const data = await request.json();
        if (data.status === 201) {
            onCloseDelete()
            toast({
                title: data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position:'top',
                onCloseComplete: (() => window.location.reload()),
            })
        }
        else {
            onCloseDelete()
            toast({
                title: data.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:'top',
                onCloseComplete: (() => window.location.reload()),
            })
        }
    }
    return (<>
        <Tr>
            <Td><PersonalImg /> </Td>
            <Td>{username}</Td>
            <Td>{datetime.substring(0, 10)}</Td>
            <Td>{datetime.substring(11)}</Td>
            <Td>{hours}</Td>
            <Td>{total}</Td>
            {
                status === "canceled" ? (<Td><Heading as='h5' size='sm' color="red.500">
                    Canceled
                </Heading></Td>) : ([status === "new" ? (<><Td>
                    <Heading as='h5' size='sm' color="#718096"> Pending </Heading></Td><Td>
                        <Button colorScheme='teal' mr="2" variant='outline' size="sm"
                            onClick={updateAppointment}
                        >
                            Update
                        </Button><Button colorScheme='red' variant='outline' size="sm"
                            onClick={onOpenDelete}
                        >
                            Delete
                        </Button>
                        <AlertDialog
                            isOpen={isOpenDelete}
                            leastDestructiveRef={cancelRef}
                            onClose={onCloseDelete}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Delete Appointment
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Are you sure? You can't undo this action afterwards.
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onCloseDelete}>
                                            Exit
                                        </Button>
                                        <Button colorScheme='red' onClick={deleteAppointment} ml={3}>
                                            Delete Appointment
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog></Td>
                </>
                ) : ([status === "confirmed" ? (<Td><Heading as='h5' size='sm' color="teal">
                    Confirmed </Heading></Td>) : (<><Td><Heading as='h5' size='sm' color="teal">
                        Completed </Heading></Td> {addReviews ? (<Td> <Button colorScheme='teal' variant='outline' size="sm"
                            onClick={onOpenReview}
                        >
                            Add Review
                        </Button></Td>) : (<></>)}</>)]
                )])
            }
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpenReview}
                onClose={onCloseReview}
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
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={AddReview}>
                            Send
                        </Button>
                        <Button onClick={onCloseReview}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Tr>
        <Tr> <Td colSpan={6}><Text size='md' color="teal">Request Details:</Text> {request}</Td>
        </Tr></>
    );
}
export default UAppointment;