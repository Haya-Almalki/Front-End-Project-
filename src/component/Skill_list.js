import { Input,Box,InputGroup,InputLeftAddon,HStack,Flex,VStack,Text,Button,Toast, useToast, Link, Image, Spacer,Select,Textarea} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';


const Skill_list = ({ skillList }) => {
    return (
      <ChakraProvider>
      <ul >
        <VStack align={"left"}>
        {skillList.map((item, index) => {
          return (
            <li key={index}  className='skill-bubble'>
              <HStack>
              <Text>{item}</Text>
              <Spacer/>
              <Button  _hover={{
              backgroundColor: 'red',
              transform: 'scale(1.05)',
            }}
            fontSize="0.75rem"
            className='skillButton'
            width="4rem"
            height="1.7rem"
            color="white"
            backgroundColor="red">Delete</Button>
            </HStack>
            </li>
          );
        })}
        </VStack>
      </ul>
      </ChakraProvider>
    );
  };
  
  export default Skill_list;