import { useState, useEffect } from "react";
import {
    Input, VStack, HStack, Flex, Button, Textarea, Text, Heading,
    NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, useToast
} from '@chakra-ui/react';
import { FiMinus, FiPlus } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateAppointment = () => {
    const toast = useToast()
    const navigate = useNavigate();
    const Location = useLocation();
    let id = Location.state.appId;
    const [date, setDate] = useState("");
    const [details, setDetails] = useState("");
    const [hour, setHour] = useState(1);
    const [location, setLocation] = useState("");
    const handleDateChange = (event) => setDate(event.target.value)
    const handleDetailsChange = (event) => setDetails(event.target.value)

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


    useEffect(() => {
        const fetchAppointmentData = async () => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic aGF5YTk2OkhoMTIzNDU2");
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };
            const request = await fetch('http://localhost:8080/api/v1/appointment/getApp/' + id, requestOptions);
            const data = await request.json();
            setDate(data.date)
            setHour(data.hours)
            setDetails(data.request)
            setLocation(data.location)
        };
        fetchAppointmentData();
    }, []);

    const cancelUpdate = () => {
        navigate("/UserAppointment")
    }

    const updateAppointment = async (e) => {
        if(date==="" || details===""){
            toast({
                title: 'Please Fill All Fields',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:'top',
              })
        }else{
        var myHeaders = new Headers();
        //myHeaders.append("Authorization", "Basic SGF5YTk2OkhoMTIzNDU2");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "date": date,
            "hours": hour,
            "request": details,
            "location": "Riyadh"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        const request = await fetch("http://localhost:8080/api/v1/appointment/update/" + id, requestOptions)
        const data = await request.json();
        if (data.status === 201) {
            toast({
                title: data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position:'top',
                onCloseComplete: (() => navigate("/UserAppointment")),
            })
            setDate("")
            setDetails("")
        }}
    }

    return (
        <HStack width="100vw" height="100vh">
            <Flex
                height="100vh"
                width={['100%', '100%', '100%']}
                justifyContent="center"
                alignItems="center"
            >
                <VStack mx="auto" align="left" spacing="5"
                    width={['100%', '100%', '50%']}>
                    <Heading as='h3' size='lg' color="teal" align="center" pb="5"> Update Appointment</Heading>
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
                    <Text mb="5px">Request Details:</Text>
                    <Textarea onChange={handleDetailsChange} value={details} />
                    <HStack
                        width={['100%', '100%', '100%']}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button colorScheme='teal' variant='outline' onClick={updateAppointment} >
                            Update
                        </Button>
                        <Button colorScheme='red' variant='outline' onClick={cancelUpdate} >
                            Cancel
                        </Button>
                    </HStack>
                </VStack></Flex>
        </HStack>
    );
};

export default UpdateAppointment;
