
import { useState, useEffect } from "react";
import {
  Heading, Flex, VStack, HStack, TableContainer, Table,
  Thead, Tr, Th, Tbody, Select,Box
} from '@chakra-ui/react'
import PAppointment from "../component/PAppointment";


function ProviderAppointment() {
  const [providerAppointment, setProviderAppointment] = useState([])
  const [confirmedAppointment, setConfirmedAppointment] = useState([])
  const [newAppointment, setNewAppointment] = useState([])
  const [completeAppointment, setcompleteAppointment] = useState([])

  const options = [
    { value: 'all', text: 'All Appointment' },
    { value: 'new', text: 'Pending' },
    { value: 'confirm', text: 'Confirmed' },
    { value: 'completed', text: 'Completed' },
  ];
  const [selected, setSelected] = useState(options[0].value);
  const handleChange = event => {
    setSelected(event.target.value);
  };
  var myHeaders = new Headers();
 // myHeaders.append("Authorization", "Basic aGF5YTpIaDEyMzEyMw==");
  //btoa("username:password")
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  useEffect(() => {
    const fetchAppointmentData = async () => {
      const request = await fetch('http://localhost:8080/api/v1/appointment/myAppointments', requestOptions);
      const data = await request.json();
      setProviderAppointment(data)
    };
    fetchAppointmentData();
  }, []);
  useEffect(() => {
    const fetchConfirmedAppointment = async () => {
      const request = await fetch('http://localhost:8080/api/v1/appointment/confirmed', requestOptions);
      const data = await request.json();
      setConfirmedAppointment(data)
    };
    fetchConfirmedAppointment();
  }, []);

  useEffect(() => {
    const fetchNewAppointment = async () => {
      const request = await fetch('http://localhost:8080/api/v1/appointment/new', requestOptions);
      const data = await request.json();
      setNewAppointment(data)
    };
    fetchNewAppointment();
  }, []);
  useEffect(() => {
    const fetchNewAppointment = async () => {
      const request = await fetch('http://localhost:8080/api/v1/appointment/completed', requestOptions);
      const data = await request.json();
      setcompleteAppointment(data)
    };
    fetchNewAppointment();
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

          {providerAppointment.length === 0 ? (<Heading as='h3' size='md' pt="15">
            You don't have any appointment
          </Heading>
          ) : (
            <>
            
              <TableContainer pt="10" >
                <HStack spacing="5" width={"90%"}>

                  <VStack width={"20%"} spacing="3" mb="5" align="left">
                    <Select value={selected} onChange={handleChange} >
                      {options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}

                    </Select>
                  </VStack>
                </HStack>
                <Box overflowX="scroll">
                <Table size='sm' variant="simple">
                  <Thead>
                    <Tr>
                      <Th></Th>
                      <Th>User Name</Th>
                      <Th>Date</Th>
                      <Th>Time</Th>
                      <Th>Total Hours</Th>
                      <Th>Total Price</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>

                    {[ selected==="all" ?
                    (providerAppointment.map((appo) => (
                      <PAppointment id={appo.id} userId={appo.userId} datetime={appo.date}
                        hours={appo.hours} total={appo.total} request={appo.request} status={appo.status} />
                    )
                    ))
                    :([ selected==="confirm"?
                    (confirmedAppointment.map((appo) => (
                      <PAppointment id={appo.id} userId={appo.userId} datetime={appo.date}
                        hours={appo.hours} total={appo.total} request={appo.request} status={appo.status} />)))
                        :([selected==="new"?
                        (newAppointment.map((appo) => (
                          <PAppointment id={appo.id} userId={appo.userId} datetime={appo.date}
                            hours={appo.hours} total={appo.total} request={appo.request} status={appo.status} />)))
                            :(completeAppointment.map((appo) => (
                              <PAppointment id={appo.id} userId={appo.userId} datetime={appo.date}
                                hours={appo.hours} total={appo.total} request={appo.request} status={appo.status} />)))])])]}
                  </Tbody>
                </Table></Box></TableContainer></>)}
        </VStack>
      </Flex>

    </HStack>
  );
}

export default ProviderAppointment;