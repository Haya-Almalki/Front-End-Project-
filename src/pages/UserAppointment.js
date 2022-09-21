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
            setUserAppointment(data)
            
        };
        fetchAppointmentData();
    }, []);
    window.scrollTo(0, 0);

    return (<>
        <Heading >
        <Navbar />
      </Heading>
        <HStack width="100vw">
            <Flex
                width={['100%', '100%', '100%']}
                justifyContent="center"
                alignItems="center"
            >
                <VStack
                    align="left"
                    height="100vh"
                    width={['100%', '100%', '80%']}>
                    <Heading as='h3' size='lg' color="teal">
                        My Appointment
                    </Heading>
                    {userAppointment.length > 0 ? (
                        <>
                            <TableContainer height="100vh"
>
                                <Table marginTop={10} size='sm'>
                                    <Thead>
                                        <Tr>
                                            <Th>Provider Name</Th>
                                            <Th>Date</Th>
                                            <Th>Time</Th>
                                            <Th>Location</Th>
                                            <Th>Total Hours</Th>
                                            <Th>Total Price</Th>
                                            <Th>status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {userAppointment.map((appo,index) => {
                                            return(
                                            <UAppointment id={appo.id} personId={appo.personId} datetime={appo.date}
                                                hours={appo.hours} total={appo.total} request={appo.request} status={appo.status}
                                                addReviews={appo.canAddReview} payed={appo.payed} location={appo.location}
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