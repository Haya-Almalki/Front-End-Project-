import { Input,Box,InputGroup,InputLeftAddon,HStack,Flex,VStack,Text,Button,Toast, useToast, Link, Image, Spacer} from '@chakra-ui/react'
import { useState } from 'react';
import profile from '../images/profile.png';



const User_profile =()=>{
    const [username, setUsername] = useState('');
    const usernameChange = (event) => setUsername(event.target.value)

    const [password, setPassword] = useState('');
    const passwordChange = (event) => setPassword(event.target.value)
  
    const toast=useToast();

return(
    <Flex
        height="100vh"
        width={'100%'}
        justifyContent="center"
        alignItems="center"
        
      >
            <HStack spacing="0" width="60%" height="auto"  backgroundColor={"white"}
          borderColor={"#d0e3e2"}
          borderRadius={"5px"}
          borderWidth={"1px"}
          padding={"1rem"}>

        <VStack align="right">
            <Image src={profile}  width={"13rem"} height={"13rem"}/>
            <Box align={"center"}>
          <Button
            _hover={{
              backgroundColor: '#121440',
              transform: 'scale(1.05)',
            }}
            fontSize="0.75rem"
            width="4rem"
            height="1.7rem"
            color="white"
            backgroundColor="#121440">
            Edit image
          </Button>
          </Box>
        </VStack>
        <Spacer/>

        <VStack
          mx="auto"
          align="left"
          spacing="5"
          height={"auto"}
          width={['90%', '90%', '70%']}
          padding={"1rem"}>
            <HStack>
          <Text fontWeight="bold" fontSize="2rem" color="#121440">
            Lubna's profile
          </Text>
          <Spacer/>
          <Box align={"center"}>
          <Button
            _hover={{
              backgroundColor: '#121440',
              transform: 'scale(1.05)',
            }}
            fontSize="0.75rem"
            width="8rem"
            height="1.7rem"
            color="white"
            backgroundColor="red">
            Delete Account
          </Button>
          </Box>
          </HStack>

           <VStack spacing="10">

            <HStack width={"100%"} spacing="5">
            <VStack width={['90%', '90%', '100']} spacing="3" align="left">
            <Text >Email:</Text>
            <Input type="email" placeholder="Username" width={"100%"}/>
            </VStack>

            <VStack width={['90%', '90%', '100%']} spacing="3" align="left">
            <Text >City:</Text>
            <Input type="text" placeholder="City" value={password} onChange={passwordChange} width={"100%"}/>
            </VStack>
            </HStack>

            
            <HStack width={"100%"} spacing="5">
            <VStack width={['90%', '90%', '100']} spacing="3" align="left">
            <Text >Password:</Text>
            <Input type="password" placeholder="Password again" value={username} onChange={usernameChange} width={"100%"}/>
            </VStack>

            <VStack width={['90%', '90%', '100%']} spacing="3" align="left">
            <Text >Confirm Password:</Text>
            <Input type="password" placeholder="Password again" value={password} onChange={passwordChange} width={"100%"}/>
            </VStack>
            </HStack>

         

          </VStack>
          <Box align={"center"}>
          <Button
            _hover={{
              backgroundColor: '#121440',
              transform: 'scale(1.05)',
            }}
            fontSize="1.3rem"
            width="182px"
            color="white"
            backgroundColor="#121440"
  
          >
            Update profile
          </Button>
          </Box>
        </VStack>

        </HStack>
      </Flex>
)
}
export default User_profile;