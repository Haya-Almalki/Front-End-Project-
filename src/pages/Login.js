import { Input,Box,InputGroup,InputLeftAddon,HStack,Flex,VStack,Text,Button,Toast, useToast, Link} from '@chakra-ui/react'
import { useState } from 'react';



const Login= ( ) =>{
    
  const [username, setUsername] = useState('');
  const usernameChange = (event) => setUsername(event.target.value)
  const [password, setPassword] = useState('');
  const passwordChange = (event) => setPassword(event.target.value)

  const toast=useToast();

  const formSubmit=()=>{

  }


  return(
      <Flex
        height="100vh"
        width={'100%'}
        justifyContent="center"
        alignItems="center"
        backgroundImage={""}
      >
        <VStack
          mx="auto"
          align="left"
          spacing="5"
          width={['90%', '90%', '458px']}>
          <Text fontWeight="bold" fontSize="3rem" color="#121440">
            Login
          </Text>
          <VStack spacing="10">
            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >Username:</Text>
            <Input type="text" placeholder="Username" value={username} onChange={usernameChange}/>
            </VStack>

            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >Password:</Text>
            <Input type="password" placeholder="Password" value={password} onChange={passwordChange}/>
            </VStack>

            <HStack align="left" width={"100%"}>
            <Text fontSize="0.75rem" color="#121440">Don't have an account?</Text>
            <Link fontSize="0.75rem" href="#" color={"#0000EE"}>Create an account</Link>
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
            onClick={formSubmit}
          >
            Login
          </Button>
          </Box>
        </VStack>
      </Flex>

  )
}
export default Login;
