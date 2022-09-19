import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Heading, Flex, VStack, HStack, TableContainer, Table, Thead, Tr, Th, Tbody, useToast
} from '@chakra-ui/react'
import UAppointment from "../component/UAppointment";
import Navbar from '../component/Navbar'


function UserAppointment() {
    const navigate = useNavigate();
    const [userAppointment, setUserAppointment] = useState([])
    const toast = useToast()

    useEffect(() => {
        const fetchAppointmentData = async () => {
            const request = await fetch('/api/v1/appointment/myAppointments');
            const data = await request.json();
            console.log(data)
            setUserAppointment(data)
            
        };
        fetchAppointmentData();
    }, []);
    return (<>
        <Heading >
        <Navbar />
      </Heading>
        <HStack width="100vw">
            <Flex pt="20"
                width={['100%', '100%', '100%']}
                justifyContent="center"
                alignItems="center"
            >
                <VStack
                    align="left"
                   // spacing="2"
                    width={['100%', '100%', '80%']}>
                    <Heading as='h3' size='lg' color="teal">
                        My Appointment:
                    </Heading>
                    {userAppointment.length > 0 ? (
                        <>
                            <TableContainer      height="100vh"
>
                                <Table size='sm'>
                                    <Thead>
                                        <Tr>
                                            <Th></Th>
                                            <Th>Provider Name</Th>
                                            <Th>Date</Th>
                                            <Th>Time</Th>
                                            <Th>Total Hours</Th>
                                            <Th>Total Price</Th>
                                            <Th>status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {userAppointment.map((appo,index) => {
                                            return(
                                            <UAppointment key={index} id={appo.id} personId={appo.personId} datetime={appo.date}
                                                hours={appo.hours} total={appo.total} request={appo.request} status={appo.status}
                                                addReviews={appo.canAddReview}
                                            />
                                            )
                                        }
                                        )}
                                    </Tbody>
                                </Table></TableContainer></>
                    ) : (
                        <Heading as='h3' size='md' pt="15">
                            You don't have any appointment
                        </Heading>
                    )}
                </VStack>
            </Flex>
        </HStack></>
    );
}

export default UserAppointment;