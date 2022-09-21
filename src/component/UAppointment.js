import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {
    Button, Td, Tr, Modal, Input,
    ModalOverlay, Textarea,
    ModalContent, Heading,
    ModalFooter, Text, Image,
    ModalBody, useToast,
    ModalCloseButton, FormControl, FormLabel, useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    HStack,
    VStack,
} from '@chakra-ui/react'
import payment from '../images/payment.PNG'


function UAppointment({ id, personId, datetime, hours, total, request, status, addReviews, payed,location }) {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [number,setNumber]=useState("");
    const[name,setName]=useState("")
    const[date,setDate]=useState("")
    const[image,setImage]=useState("")
    const[cvc,setCvc]=useState("")
    const handleDate = (event) => setDate(event.target.value)
    const handleName = (event) => setName(event.target.value)
    const handleNumber = (event) => setNumber(event.target.value)
    const handleCvc = (event) => setCvc(event.target.value)

    const { isOpen: isOpenReview, onOpen: onOpenReview, onClose: onCloseReview } = useDisclosure()
    const { isOpen: isOpenPay, onOpen: onOpenPay, onClose: onClosePay } = useDisclosure()

    const initialRef = React.useRef(null)
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()

    const cancelRef = React.useRef()
    const [rate, setRate] = useState();
    const [review, setReview] = useState("");
    const[provider,setProvider]=useState()
    const handleReview = (event) => setReview(event.target.value)
    const toast = useToast()

    useEffect(() => {
        const fetchusername = async () => {
            const request = await fetch("/api/v1/user/username/" + personId, { method: 'POST' })
            const data = await request.json();
            setUsername(data.message)
        };
        fetchusername();
    }, []);

 
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "message": review,
        "rate": rate
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    const ispayed = async (e) => {
        if(name ==="" || number==="" || date===""|| cvc===""){
            toast({
                title: "Please fill all the fields",
                status: 'error',
                duration: 1000,
                isClosable: true,
                position: 'top',
            })
        }
else{

        const request = await fetch("/api/v1/appointment/paid/" + id, {
            method: 'POST',
            headers: myHeaders
        });
        const data = await request.json();
        if (data.status === 200) {
            toast({
                title: data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
                onCloseComplete: (() => window.location.reload()),
            })
        }
    }
    }
    const AddReview = async (e) => {
       
        const request = await fetch("/api/v1/review/addReview/" + id, requestOptions)
        const data = await request.json();

        if (data.status === 201) {
            onCloseReview()
            toast({
                title: data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
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
                position: 'top',
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
        const request = await fetch("/api/v1/appointment/delete/" + id, {
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
                position: 'top',
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
                position: 'top',
                onCloseComplete: (() => window.location.reload()),
            })
        }
    }
    return (<>
        <Tr>
      
            <Td>{username}</Td>
            <Td>{datetime.substring(0, 10)}</Td>
            <Td>{datetime.substring(11)}</Td>
            <Td>{location}</Td>
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
                ) : ([status === "confirmed" && payed ? (<Td><Heading as='h5' size='sm' color="teal">
                    Confirmed </Heading></Td>) : ([status === "confirmed" && !payed ? (<><Td> <Button colorScheme='orange' variant='outline' size="sm"
                        onClick={onOpenPay}
                    >
                        Pay Now
                    </Button></Td>
                        <Modal
                            initialFocusRef={initialRef}
                            finalFocusRef={finalRef}
                            isOpen={isOpenPay}
                            onClose={onClosePay}
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalCloseButton />
                                <ModalBody pb={6} textAlign="center">
                                    <FormControl mt={4}>
                                        <FormLabel>PAYMENT</FormLabel>
                                        <Image
                                            w="50%"
                                            src={payment}
                                            alt="payment"
                                        />
                                    </FormControl>
                                    <FormControl mt={2}>
                                        <FormLabel>Card number</FormLabel>
                                        <Input
                                         onChange={handleNumber}
                                         value={number}
                                            size='sm'
                                        />
                                    </FormControl>
                                    
                                    <FormControl mt={2}>
                                        <FormLabel>Cardholders name</FormLabel>
                                        <Input
                                        onChange={handleName}
                                        value={name}
                                            size='sm'
                                        />

                                    </FormControl>

                                    <FormControl mt={1}>
                                        <HStack>
                                            <VStack spacing="1" align="left" width={"20%"} >

                                                <FormLabel>CVC</FormLabel>
                                                <Input
                                                onChange={handleCvc}
                                                value={cvc}
                                                    type="password"
                                                    size='sm'
                                                /></VStack> <VStack spacing="1" align="left" width={"40%"}>

                                                <FormLabel>Expires on</FormLabel>

                                                <Input type="month" id="start" 
                                                onChange={handleDate}
                                                value={date}
                                                name="start" size="sm"
                                                    min={new Date().toISOString().slice(0, 16)}
                                                />
                                            </VStack>
                                        </HStack>

                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={ispayed}>
                                        Pay
                                    </Button>
                                    <Button onClick={onClosePay}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                    </>) : (<><Td><Heading as='h5' size='sm' color="teal">
                        Completed </Heading></Td> {addReviews ? (<Td> <Button colorScheme='teal' variant='outline' size="sm"
                            onClick={onOpenReview}
                        >
                            Add Review
                        </Button></Td>) : (<></>)}</>)])]
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