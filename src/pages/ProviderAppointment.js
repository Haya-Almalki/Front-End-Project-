
import { useState, useEffect } from "react";
import {
  Heading, Flex, VStack, HStack, TableContainer, Table,
  Thead, Tr, Th, Tbody, Select, Box
} from '@chakra-ui/react'
import PAppointment from "../component/PAppointment";
import Navbar from "../component/Navbar";

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

  useEffect(() => {
    const fetchAppointmentData = async () => {
      const request = await fetch('/api/v1/appointment/myAppointments');
      const data = await request.json();
      setProviderAppointment(data)
    };
    fetchAppointmentData();
  }, []);
  useEffect(() => {
    const fetchConfirmedAppointment = async () => {
      const request = await fetch('/api/v1/appointment/confirmed');
      const data = await request.json();
      setConfirmedAppointment(data)
    };
    fetchConfirmedAppointment();
  }, []);

  useEffect(() => {
    const fetchNewAppointment = async () => {
      const request = await fetch('/api/v1/appointment/new');
      const data = await request.json();
      setNewAppointment(data)
    };
    fetchNewAppointment();
  }, []);
  useEffect(() => {
    const fetchNewAppointment = async () => {
      const request = await fetch('/api/v1/appointment/completed');
      const data = await request.json();
      setcompleteAppointment(data)
    };
    fetchNewAppointment();
  }, []);

  window.scrollTo(0, 0);
  return (
    <>  <Heading >
      <Navbar />
    </Heading>
      <HStack width="100vw" >
        <Flex pt="20"
          width={['100%', '100%', '100%']}
          justifyContent="center"
          alignItems="center"
        >
          <VStack
            height="100vh"
            align="left"
            width={['100%', '100%', '80%']}>
            <Heading as='h3' size='lg' color="teal">
              My Appointment
            </Heading>

            {providerAppointment.length > 0 ? (
              <>

                <TableContainer height="100vh">
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
                  <Table size='sm' marginTop={10} variant="simple">
                    <Thead>
                      <Tr>
                        <Th>User Name</Th>
                        <Th>Date</Th>
                        <Th>Time</Th>
                        <Th>Location</Th>
                        <Th>Total Hours</Th>
                        <Th>Total Price</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>

                      {[selected === "all" ?
                        (providerAppointment.map((appo) => (
                          <PAppointment id={appo.id} userId={appo.userId} datetime={appo.date}
                            hours={appo.hours} total={appo.total} request={appo.request} status={appo.status}
                            payed={appo.payed} location={appo.location}
                          />
                        )
                        ))
                        : ([selected === "confirm" ?
                          (confirmedAppointment.map((appo) => (
                            <PAppointment id={appo.id} userId={appo.userId} datetime={appo.date}
                              hours={appo.hours} total={appo.total} request={appo.request} status={appo.status} payed={appo.payed} location={appo.location} />)))
                          : ([selected === "new" ?
                            (newAppointment.map((appo) => (
                              <PAppointment id={appo.id} userId={appo.userId} datetime={appo.date}
                                hours={appo.hours} total={appo.total} request={appo.request} status={appo.status}  payed={appo.payed} location={appo.location} />)))
                            : (completeAppointment.map((appo) => (
                              <PAppointment id={appo.id}  userId={appo.userId} datetime={appo.date}
                                hours={appo.hours} total={appo.total} request={appo.request} status={appo.status} payed={appo.payed} location={appo.location} />)))])])]}
                    </Tbody>
                  </Table></TableContainer></>
            ) : (<Heading as='h3' size='md' pt="15">
              You don't have any appointment
            </Heading>
            )}
          </VStack>
        </Flex>

      </HStack></>
  );
}

export default ProviderAppointment;