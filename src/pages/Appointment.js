
import { useState } from "react";
import {
    Input, VStack, HStack, Flex, Button, Textarea, Text, Heading,
    NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper
} from '@chakra-ui/react';
import { FiMinus, FiPlus } from "react-icons/fi";


function Appointment() {
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

    const handleDateChange = (event) => setDate(event.target.value)

    console.log(date);
    const handleHourChange =(event) => console.log(event.target.value)

    return (

        <HStack spacing="0" width="100vw" height="100vh">
            <Flex
                height="100vh"
                width={['100%', '100%', '70%']}
                justifyContent="center"
                alignItems="center"
            >
                <VStack mx="auto" align="left" spacing="5"
                    width={['100%', '100%', '50%']}>
                    <Heading as='h3' size='lg'> Book Appointment</Heading>

                    <Text>Choose Date and Time:</Text>

                    <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                        min={new Date().toISOString().slice(0, 16)}
                        onChange={handleDateChange}
                    />
                    <Text>Working Hour:</Text>
                    <NumberInput size="sm" defaultValue={1} min={1} 
 
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
                    <Textarea />

                    <Button colorScheme='teal' variant='outline'>
                        Book Now
                    </Button>
                </VStack></Flex>
        </HStack>

    );
}

export default Appointment;
