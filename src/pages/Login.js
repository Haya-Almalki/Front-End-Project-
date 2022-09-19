import { Input,Box,InputGroup,InputLeftAddon,HStack,Flex,VStack,Text,Button,Toast, useToast, Link} from '@chakra-ui/react'
import { useState,useEffect  } from 'react';
import { Link as ReactLink,useNavigate } from 'react-router-dom';




const Login= () =>{
    
  const [username, setUsername] = useState('');
  const usernameChange = (event) => setUsername(event.target.value)
  const [password, setPassword] = useState('');
  const passwordChange = (event) => setPassword(event.target.value)

  const toast=useToast();
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      navigate('/');
    }
  }, []);


  const formSubmit=async ()=>{
    if(username==""||password==""){
      toast({
        title: 'Error',
        description: 'Please enter your username and password',
        status: 'error',
        duration: 2000,
        isClosable: false,
        position: 'top',
      });
      return;
    }
    const request = await fetch('/api/v1/user/login', {
      method: 'POST',
      headers: {
        authorization: 'Basic ' + btoa(username + ':' + password),
      },
    });

    const data = await request.json();

    if (request.status === 401) {
      toast({
        title: 'Error',
        description: "Wrong username or email",
        status: 'error',
        duration: 2000,
        isClosable: false,
        position: 'top',
      });
    } else if (request.status === 200) {
      const fetchUser = async () => {
        const request1 = await fetch('/api/v1/user/me');
        const data1 = await request1.json();
        localStorage.setItem('username', data1.username)
        localStorage.setItem('role', data1.role)
        


      }
        fetchUser()
        
      localStorage.setItem('loggedIn', true);
      toast({
        title: 'logged in successfully.',
        description: data.message,
        status: 'success',
        duration: 2000,
        isClosable: false,
        position: 'top',
      });
      navigate('/');
    }
    
    
    

  }


  return(
    
      <Flex
        height="100vh"
        width={'100%'}
        justifyContent="center"
        alignItems="center"
        
      >
        <VStack
          mx="auto"
          align="left"
          spacing="5"
          width={['90%', '90%', '458px']}>
          <Text fontWeight="bold" fontSize="3rem" color="teal">
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
            <Link as={ReactLink} fontSize="0.75rem" to="/register" color={"#23B7B2"}>Create an account</Link>
            </HStack>

          </VStack>
          <Box align={"center"}>
          <Button
          _hover={{
            transform: 'scale(1.05)',
          }}
           
            fontSize="1.3rem"
            width="182px"
            colorScheme='teal' variant='outline'
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
