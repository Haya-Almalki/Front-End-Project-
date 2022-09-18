import PersonalImg from "./PersonalImg";
import {Button, Tr , Td} from '@chakra-ui/react'
function PAppointment() {
    return (
       
                    <Tr>
                        <Td><PersonalImg /></Td>
                        <Td>Haya</Td>
                        <Td>2022-09-24</Td>
                        <Td>5</Td>
                        <Td>
                            I would like somebody ........</Td>
                        <Td><Button colorScheme='teal' variant='outline'>
                            Confirm
                        </Button></Td>
                        <Td>
                            <Button colorScheme='teal' variant='outline'>
                                Reject
                            </Button>
                        </Td>
                    </Tr>
                   
           
    );
}

export default PAppointment;