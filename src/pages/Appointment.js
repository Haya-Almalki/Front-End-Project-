
import {  useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Navbar from '../component/Navbar'

import {
    Input, VStack, HStack, Flex, Button, Textarea, Text, Heading,
    NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper,useToast 
} from '@chakra-ui/react';
import { FiMinus, FiPlus } from "react-icons/fi";

function Appointment() {
    const navigate = useNavigate();
    const Location=useLocation();
    let provider=Location.state.providerName;
    const toast = useToast()
    const stepperButtonStyles = {
        width: `30px`,
        height: `30px`,
        overflow: `hidden`,
        margin: `0`,
        backgroundColor: `#eee`,
        border: `0px solid`,
        borderColor: `#999`,
        borderRadius: `6px`,
        fontSize: `20px`,
        textAlign: `center`,
        display: `grid`,
        alignContent: `center`,
        alignItems: `center`,
        justifyContent: `center`,
        justifyItems: `center`
    };
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");

    const [details, setDetails] = useState("");
    const [hour, setHour] = useState(1);
    const handleDateChange = (event) => setDate(event.target.value)
    const handleLocationChange = (event) => setLocation(event.target.value)
    const handleDetailsChange = (event) => setDetails(event.target.value)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": provider,
        "hours": hour,
        "date": date,
        "request": details,
        "location":location
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
   
        const sendAppointmentData = async () => {

            if(date==="" || details===""){
                toast({
                    title: 'Please Fill All Fields',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position:'top',
                  })
            }
            else{
            const request = await  fetch("/api/v1/appointment/post", requestOptions);
            const data = await request.json();
            console.log(data.message)
            if(data.status===201){
                toast({
                    title: 'The booking has been completed.',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position:'top',
                    onCloseComplete:(() => navigate("/UserAppointment")),
                  })
                setDate("");
                setDetails("");
                setHour(1)
            }
            else{
                toast({
                    title: data.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position:'top',
                  }) 
            }
        }
        };
    const BookAppointment = async (e) => {
        sendAppointmentData();
    }
    window.scrollTo(0, 0);

    return (
        <> <Heading >
        <Navbar />
      </Heading>
        <HStack width="100vw" height="100vh">
            <Flex
                height="100vh"
                width={['100%', '100%', '100%']}
                justifyContent="center"
                alignItems="center"
            >
                <VStack mx="auto" align="left" spacing="5"
                    width={['100%', '100%', '50%']}>
                       
                    <Heading as='h3' size='lg' color="teal" align="center" pb="5"> Book Appointment</Heading>
                    <Text>Choose Date and Time:</Text>
                    <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                        value={date}
                        min={new Date().toISOString().slice(0, 16)}
                        onChange={handleDateChange}
                    />
                    <Text>Working Hour:</Text>
                    <NumberInput size="sm"
                        defaultValue={hour} min={1}
                        onChange={setHour}
                        value={hour}
                        style={{
                            display: `grid`,
                            gridTemplateColumns: `30px 80px 1px`,
                            gridGap: `10px`,
                        }}>
                        <NumberDecrementStepper
                            children={<FiMinus />}
                            style={{ ...stepperButtonStyles }}
                        />
                        <NumberInputField style={{ border: `none`, textAlign: `center` }} />
                        <NumberIncrementStepper
                            children={<FiPlus />}
                            style={{ ...stepperButtonStyles }}
                        />
                    </NumberInput>
                    <Text mb="5px">Location:</Text>
                    <Input
                        size="md"
                        value={location}
                        onChange={handleLocationChange}
                    />
                    <Text mb="5px">Request Details:</Text>
                    <Textarea onChange={handleDetailsChange} value={details}/>
                    <HStack
                width={['100%', '100%', '100%']}
                justifyContent="center"
                alignItems="center"
            >
                    <Button colorScheme='teal' variant='outline'  onClick={BookAppointment}>
                        Book Now
                    </Button>
                    </HStack>
                </VStack></Flex>
        </HStack></>
    );
}

export default Appointment;
