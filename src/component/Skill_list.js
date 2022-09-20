import { Input,Box,InputGroup,InputLeftAddon,HStack,Flex,VStack,Text,Button,Toast, useToast, Link, Image, Spacer,Select,Textarea} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';


const Skill_list = ({ skillList,deleteSkill}) => {
  console.log("skill list in component",skillList)
    return (
      <ChakraProvider>
      <ul >
        <VStack align={"left"}>
        {skillList.map((item, index) => {
          return (
            <li key={item.id}  className='skill-bubble'>
              <HStack>
              <Text>{item.skill}</Text>
              <Spacer/>
              <Button  _hover={{
              backgroundColor: 'red',
              transform: 'scale(1.05)',
            }}
            id={item.id}
            fontSize="0.75rem"
            className='skillButton'
            width="4rem"
            height="1.7rem"
            color="white"
            backgroundColor="red"
            onClick={deleteSkill}>Delete</Button>
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