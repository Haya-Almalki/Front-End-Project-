import PersonalImg from "./PersonalImg";
import {
    Button, Heading, Tr, Td, Text, useToast, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay, useDisclosure
} from '@chakra-ui/react'
import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';

function PAppointment({ id, userId, datetime, hours, total, request, status }) {
    const [username, setUsername] = useState("")
    const toast = useToast()
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic aGF5YTpIaDEyMzEyMw==");
    //btoa("username:password")
    myHeaders.append("Content-Type", "application/json");

    var raw = ""
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    useEffect(() => {
        const fetchusername = async () => {
            const request = await fetch("http://localhost:8080/api/v1/user/username/" + userId, { method: 'POST' })
            const data = await request.json();
            setUsername(data.message)
        };
        fetchusername();
    }, []);

    const confirmAppointment = async (e) => {
        const request = await fetch("http://localhost:8080/api/v1/appointment/confirm/" + id, requestOptions);
        const data = await request.json();
        console.log(data)
        if (data.status === 201) {
            toast({
                title: data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position:'top',
                onCloseComplete:(() => window.location.reload()),
            })         
        }else{
            toast({
                title: data.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:'top',
                onCloseComplete:(() => window.location.reload()),
            })
        }
    }
    const completeAppointment = async (e) => {
        const request = await fetch("http://localhost:8080/api/v1/appointment/complete/" + id, requestOptions);
        const data = await request.json();
        console.log(data)
        if (data.status === 201) {
            toast({
                title: data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position:'top',
                onCloseComplete:(() => window.location.reload()),
            })
        }
    }
    const cancelAppointment = async (e) => {
        const request = await fetch("http://localhost:8080/api/v1/appointment/cancelNew/" + id, requestOptions);
        const data = await request.json();
        console.log(data)
        if (data.status === 201) {
            onClose()
            toast({
                title: data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position:'top',
                onCloseComplete:(() => window.location.reload()),
            })
        }
        else{
            onClose()
            toast({
                title: data.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:'top',
                onCloseComplete:(() => window.location.reload()),
            })
        }
    }  
    return (
        <>
            <Tr key={id}>
                <Td><PersonalImg /></Td>
                <Td>{username}</Td>
                <Td>{datetime.substring(0, 10)}</Td>
                <Td>{datetime.substring(11)}</Td>
                <Td>{hours}</Td>
                <Td>{total}</Td>
                {status === "new" ? (<><Td><Heading as='h5' size='sm' color="#718096"> Pending</Heading></Td>
                    <Td><Button colorScheme='teal' onClick={confirmAppointment} variant='outline' mr="2">
                        Confirm
                    </Button>
                        <Button colorScheme='red' variant='outline' onClick={onOpen}>
                            Cancel
                        </Button>
                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Cancel Appointment
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Are you sure? You can't undo this action afterwards.
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onClose}>
                                            Exit
                                        </Button>
                                        <Button colorScheme='red' onClick={cancelAppointment} ml={3}>
                                            Cancel Appointment
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Td></>) : ([status === "confirmed" ? (<><Td> <Heading as='h5' size='sm' color="teal"> Confirmed</Heading></Td><Td><Button colorScheme='teal' onClick={completeAppointment} variant='outline' mr="2">
                        Completed
                    </Button></Td></>) : ([status === "canceled" ? (<Td>
                        <Heading as='h5' size='sm' color="red.500"> Canceled</Heading></Td>) : (<Td><Heading as='h5' size='sm' color="teal">
                        Completed
                    </Heading></Td>)])])}
            </Tr>
            <Tr> <Td colSpan={6}><Text size='md' color="teal">Request Details: </Text>{request}</Td>
            </Tr>
        </>
    );
}

export default PAppointment;