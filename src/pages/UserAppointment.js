
import { useState } from "react";
import {
    Heading, Flex, VStack, HStack, TableContainer, Table, Thead, Tr, Th, Tbody
} from '@chakra-ui/react'
import UAppointment from "../component/UAppointment";
import Navbar from "../component/Navbar";

function UserAppointment() {
    const [userAppointment, setUserAppointment] = useState([])
    
    return (
        <>
        <Navbar/>
        <HStack spacing="0" width="100vw" height="100vh">
            <Flex
                height="100vh"
                width={['100%', '100%', '100%']}
                justifyContent="center"
                alignItems="center"
            >
                <VStack
                    mx="auto"
                    align="left"
                    spacing="5"
                    width={['100%', '100%', '90%']}
                >
                    <Heading as='h3' size='lg'>
                        My Appointment:
                    </Heading>
                    <TableContainer m="3">
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th></Th>
                                    <Th>Provider Name</Th>
                                    <Th>Date</Th>
                                    <Th>Total Hours</Th>
                                    <Th>Request Details</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <UAppointment />
                            </Tbody>
                        </Table></TableContainer>
                </VStack>
            </Flex>
        </HStack>
        </>

    );
}

export default UserAppointment;