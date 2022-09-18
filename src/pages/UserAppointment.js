import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Heading, Flex, VStack, HStack, TableContainer, Table, Thead, Tr, Th, Tbody
} from '@chakra-ui/react'
import UAppointment from "../component/UAppointment";

function UserAppointment() {
   
      const [userAppointment, setUserAppointment] = useState([])

    var myHeaders = new Headers();
   // myHeaders.append("Authorization", "Basic SGF5YTk2OkhoMTIzNDU2");
    //btoa("username:password")
    //aGF5YTExOkhoMTIzMTIz
    //SGF5YTk2OkhoMTIzNDU2
    var requestOptions = {
        method: 'GET',
     //   headers: myHeaders,
    };
    useEffect(() => {
        const fetchAppointmentData = async () => {
            const request = await fetch('http://localhost:8080/api/v1/appointment/myAppointments', requestOptions);
            const data = await request.json();
            setUserAppointment(data)
        };
        fetchAppointmentData();
    }, []);
    return (
        <HStack width="100vw" >
            <Flex pt="20"
                width={['100%', '100%', '100%']}
                justifyContent="center"
                alignItems="center"
            >
                <VStack
                    align="left"
                    spacing="2"
                    width={['100%', '100%', '80%']}>
                    <Heading as='h3' size='lg' color="teal">
                        My Appointment:
                    </Heading>
                    {userAppointment.length > 0 ? (
                        <>
                            <TableContainer pt="10">
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
                                        {userAppointment.map((appo) => (
                                            <UAppointment id={appo.id} personId={appo.personId} datetime={appo.date}
                                                hours={appo.hours} total={appo.total} request={appo.request} status={appo.status}
                                                addReviews={appo.canAddReview}
                                            />
                                        )
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
        </HStack>
    );
}

export default UserAppointment;