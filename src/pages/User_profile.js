import { Input,Box,InputGroup,InputLeftAddon,HStack,Flex,VStack,Text,Button,Toast, useToast, Link, Image, Spacer,Select,Heading} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import profile from '../images/profile.png';
import SA from '../component/SA';
import Navbar from '../component/Navbar'

const User_profile =()=>{
     const [user,setUser]=useState('')
     const [name,setName]=useState('User')
    const [email, setEmail] = useState('');
    const emailChange = (event) => setEmail(event.target.value)

    const [city, setCity] = useState('');
    const cityChange = (event) => setCity(event.target.value)
  
    const [password, setPassword] = useState('');
    const passwordChange = (event) => setPassword(event.target.value)

    const [password2, setPassword2] = useState('');
    const passwordChange2 = (event) => setPassword2(event.target.value)

    const toast=useToast();
    const navigate = useNavigate();


    useEffect(() => {
    const fetchUser = async () => {
      const request = await fetch('/api/v1/user/me');
      const data = await request.json();
      if (request.status === 200) {
        console.log("fetch me successful")
        setUser(data);
        setName(data.username)
        console.log("from me:",data);
        setEmail(data.email);
        setCity(data.city);
      } else if (request.status === 401) {
        localStorage.removeItem('loggedIn');
        navigate('/login');
      }
    };
    fetchUser();
  },[]);


const updateProfile= async ()=>{
  const userCopy=user;
  //  console.log("this is usercopy:",userCopy);
  userCopy.password=null;
  if(password===''&&password2===''){
    userCopy.email=email;
    console.log("copy email",userCopy.email)
    userCopy.city=city;
    console.log("copy city",userCopy.city)
    const request1 = await fetch('/api/v1/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {email:userCopy.email,
         city:userCopy.city}),
    });
    const data1 = await request1.json();
    if (request1.status === 401) {
      toast({
        title: 'Error',
        description: data1.message,
        status: 'error',
        duration: 2000,
        isClosable: false,
        position: 'top',
      });} else{
        toast({
          title: 'Profile updated',
          status: 'success',
          duration: 2000,
          isClosable: false,
          position: 'top',
        });
      }
  }else{
if(password===password2){
  userCopy.email=email;
  console.log("copy email",userCopy.email)
  userCopy.city=city;
  console.log("copy city",userCopy.city)
  userCopy.password=password;
  const request2 = await fetch('/api/v1/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {email:userCopy.email,
       city:userCopy.city,
      password:password}),
  });
  const data2 = await request2.json();
  if (request2.status === 401) {
    toast({
      title: 'Error',
      description: data2.message,
      status: 'error',
      duration: 2000,
      isClosable: false,
      position: 'top',
    });} else{
      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 2000,
        isClosable: false,
        position: 'top',
      });
    }
}else{
  toast({
    title: 'Mismatch password',
    description: "Please enter the passwords again",
    status: 'error',
    duration: 9000,
    isClosable: true,
  })
}
  }

}
return(<>
     <Heading >
        <Navbar />
      </Heading>
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
            {name}'s profile
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
            <Input type="email" placeholder="Email" value={email} onChange={emailChange} width={"100%"}/>
            </VStack>

            <VStack width={['90%', '90%', '100%']} spacing="3" align="left">
            <Text >City:</Text>
            <Select value={city} onChange={cityChange} >

                     {SA.cities.map((city,index) => (
                    <option key={index} value={city}>
                    {city}
                   </option> ))} 
                    </Select>
            </VStack>
            </HStack>

            
            <HStack width={"100%"} spacing="5">
            <VStack width={['90%', '90%', '100']} spacing="3" align="left">
            <Text >Password:</Text>
            <Input type="password" placeholder="Password again" value={password} onChange={passwordChange} width={"100%"}/>
            </VStack>

            <VStack width={['90%', '90%', '100%']} spacing="3" align="left">
            <Text >Confirm Password:</Text>
            <Input type="password" placeholder="Password again" value={password2} onChange={passwordChange2} width={"100%"}/>
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
            onClick={updateProfile}
          >
            Update profile
          </Button>
          </Box>
        </VStack>

        </HStack>
      </Flex>
      </>
)
}
export default User_profile;