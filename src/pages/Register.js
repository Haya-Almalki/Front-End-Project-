import {
  Input, Box, InputGroup, InputLeftAddon, HStack, Flex,
  VStack, Text, Button, Toast, useToast, Link
  , TabList, Tab, Tabs, TabPanel, TabPanels, Select
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SA from '../component/SA'


const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();



 




  //user
  const [username, setUsername] = useState('');
  const usernameChange = (event) => setUsername(event.target.value)
  const [password, setPassword] = useState('');
  const passwordChange = (event) => setPassword(event.target.value)
  const [email, setEmail] = useState('');
  const emailChange = (event) => setEmail(event.target.value)
  const [confirmPassword, setconfirmPassword] = useState('');
  const confirmPasswordChange = (event) => setconfirmPassword(event.target.value)
  const [city, setCity] = useState('');
  const cityChange = (event) => setCity(event.target.value)
  const role = "USER";
  const [image, setImage] = useState('');



  //provider
  const [username1, setUsername1] = useState('');
  const usernameChange1 = (event) => setUsername1(event.target.value)
  const [password1, setPassword1] = useState('');
  const passwordChange1 = (event) => setPassword1(event.target.value)
  const [email1, setEmail1] = useState('');
  const emailChange1 = (event) => setEmail1(event.target.value)
  const [confirmPassword1, setconfirmPassword1] = useState('');
  const confirmPasswordChange1 = (event) => setconfirmPassword1(event.target.value)
  const [city1, setCity1] = useState('');
  const cityChange1 = (event) => setCity1(event.target.value)


  const [description, setDescription] = useState('');
  const descriptionChange = (event) => setDescription(event.target.value)
  const [skills, setSkills] = useState('');
  const skillsChange = (event) => setSkills(event.target.value)
  const [category, setCategory] = useState('');
  const categoryChange = (event) => setCategory(event.target.value)
  const [price, setPrice] = useState('');
  const priceChange = (event) => setPrice(event.target.value)
  console.log(price)
  const role1 = "PERSON";
  const [image1, setImage1] = useState('');





  const formSubmitUser = async () => {
    if (username == "" || password == "" | email == "" | city == "") {
      toast({
        title: 'Error',
        description: 'Please complete all fields',
        status: 'error',
        duration: 5000,
        isClosable: false,
        position: 'top',
      });
      return;
    }
    if (password != confirmPassword) {
      toast({
        title: 'Error',
        description: 'confirmPassword does not match password',
        status: 'error',
        duration: 5000,
        isClosable: false,
        position: 'top',
      });
      return;
    }
    const bodyValue = {
      username,
      password,
      email,
      city,
      role,
      image
    };

    try {
      const request = await fetch('/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyValue),
      });

      const data = await request.json();

      if (request.status === 201) {
        toast({
          title: 'registered successfully.',
          description: data.message,
          status: 'success',
          duration: 5000,
          isClosable: false,
          position: 'top',
        });
        navigate('/login');
      } else {
        toast({
          title: 'Error',
          description: data.message,
          status: 'error',
          duration: 5000,
          isClosable: false,
          position: 'top',
        });
      }
    } catch (e) {
      alert('Server error');
      console.log(e);
    }
  };

  const formSubmitProvider = async () => {
    if (username1 == "" || password1 == "" | email1 == "" | city1 == "" | description == ""
       | category == "" | price == "") {
      toast({
        title: 'Error',
        description: 'Please complete all fields',
        status: 'error',
        duration: 5000,
        isClosable: false,
        position: 'top',
      });
      return;
    }
    if (password1 != confirmPassword1) {
      toast({
        title: 'Error',
        description: 'confirmPassword does not match password',
        status: 'error',
        duration: 5000,
        isClosable: false,
        position: 'top',
      });
      return;
    }
    const priceValue = Number(price);
    const bodyValue1 = {

      "username": username1,
      "role": role1,
      "password": password1,
      "pricePerHour": priceValue,
      "category": category,
      "description": description,
      "city": city1,
      "email": email1,
      "image": image1

    };

    try {
      const request = await fetch('/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyValue1),
      });

      const data = await request.json();

      console.log(data.message)

      if (request.status === 201) {
        toast({
          title: 'registered successfully.',
          description: data.message,
          status: 'success',
          duration: 5000,
          isClosable: false,
          position: 'top',
        });
        navigate('/login');
      } else {
        toast({
          title: 'Error',
          description: data.message,
          status: 'error',
          duration: 5000,
          isClosable: false,
          position: 'top',
        });
      }
    } catch (e) {
      alert('Server error');
      console.log(e);
    }
  }




  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      navigate('/');
    }
  }, []);

 

  const fileSelected = async (e)=>{
    var form = new FormData();
    form.append('image', e.target.files[0])
    const request = await fetch("https://api.imgbb.com/1/upload?key=e82fd60d23ac4565290f5a3dce0e69cf",{
      method: 'POST',
      body:form
    });    
    const data = await request.json();
    setImage(data.data.url)
    
  }

  
  const fileSelected1 = async (e)=>{
    var form = new FormData();
    form.append('image', e.target.files[0])
    const request = await fetch("https://api.imgbb.com/1/upload?key=e82fd60d23ac4565290f5a3dce0e69cf",{
      method: 'POST',
      body:form
    });    
    const data = await request.json();
    setImage1(data.data.url)
    
  }



  return (
    <VStack mt={"5rem"}
      width={'100%'}
      alignItems="center">
      <Tabs isFitted variant='enclosed' defaultIndex={0} width={'100%'}>
        <TabList mb='1em'>
          <Tab>User</Tab>
          <Tab>Provider</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex
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
                  User Registration
                </Text>
                <VStack spacing="10">

                  <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
                    <Text >Profile Image:</Text>
                    <Input type="file" onChange={fileSelected} placeholder="Profile Image" accept="image/*" />
                  </VStack>

                  <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
                    <Text >Username:</Text>
                    <Input type="text" placeholder="Enter Username" value={username} onChange={usernameChange} />
                  </VStack>

                  <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
                    <Text >Password:</Text>
                    <Input type="password" placeholder="Enter Password" value={password} onChange={passwordChange} />
                  </VStack>

                  <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
                    <Text >Confirm Password:</Text>
                    <Input type="password" placeholder="Enter Password again" value={confirmPassword} onChange={confirmPasswordChange} />
                  </VStack>

                  <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
                    <Text >Email:</Text>
                    <Input type="email" placeholder="Enter Email" value={email} onChange={emailChange} />
                  </VStack>

                  <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
                    <Text >City Location:</Text>
                    <Select placeholder='Select City' value={city} onChange={cityChange} >

                          {SA.cities.map((city,index) => (
                          <option key={index} value={city}>
                                      {city}
                                    </option> ))} 
                            </Select>   
              </VStack>


                </VStack>
                <Box align={"center"}>
                  <Button
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                    fontSize="1.3rem"
                    width="182px"
                    colorScheme='teal' variant='outline'
                    onClick={formSubmitUser}
                  >Sign up </Button>
                </Box>
              </VStack>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              width={'100%'}
              justifyContent="center"
              alignItems="center"
            >
              <VStack
                mx="auto"
                align="left"
                spacing="5"
                width={['90%', '90%', '35%']}>
                <Text fontWeight="bold" fontSize="3rem" color="teal">
                  Provider Registration
                </Text>
                <VStack spacing="10">

                   <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
                    <Text >Profile Image:</Text>
                    <Input type="file" onChange={fileSelected1} placeholder="Profile Image" accept="image/*" />
                  </VStack> 

                  <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
                    <Text >Username:</Text>
                    <Input type="text" placeholder="Enter Username" value={username1} onChange={usernameChange1} />
                  </VStack>

                  <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
                    <Text >Password:</Text>
                    <Input type="password" placeholder="Enter Password" value={password1} onChange={passwordChange1} />
                  </VStack>

                  <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
                    <Text >Confirm Password:</Text>
                    <Input type="password" placeholder="Enter Password again" value={confirmPassword1} onChange={confirmPasswordChange1} />
                  </VStack>

                  <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
                    <Text >Email:</Text>
                    <Input type="email" placeholder="Enter Email" value={email1} onChange={emailChange1} />
                  </VStack>

                  <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
                    <Text >City:</Text>
                    <Select placeholder='Select City' value={city1} onChange={cityChange1} >

                     {SA.cities.map((city,index) => (
                    <option key={index} value={city}>
                    {city}
                   </option> ))} 
                    </Select>
                  </VStack>

                  <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
                    <Text >Description:</Text>
                    <Input type="text" placeholder="Enter Description" value={description} onChange={descriptionChange} />
                  </VStack>


                  <HStack spacing="5" width={"90%"}>

                    <VStack width={"50%"} spacing="3" align="left">
                      <Text >Choose catagory:</Text>
                      <Select placeholder='Select option' value={category} onChange={categoryChange} >
                        <option value='Tutoring'>Tutoring</option>
                        <option value='Patient Assistant'>Patient Assistant</option>
                        <option value='Baby Sitter'>Baby Sitter</option>
                        <option value='Travelling'>Travelling</option>
                        <option value='Shopping'>Shopping</option>
                        <option value='Cooking'>Cooking</option>
                        <option value='Gaming'>Gaming</option>
                        <option value='Art'>Art</option>
                        <option value='Party Hosting'>Party Hosting</option>

                      </Select>
                    </VStack>

                    <VStack width={"50%"} spacing="3" align="left">
                      <Text >Price:</Text>
                      <Input type="text" placeholder="Price per hour" value={price} onChange={priceChange} />
                    </VStack>

                  </HStack>
                </VStack>



                <Box align={"center"} pt="5rem">
                  <Button
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                    fontSize="1.3rem"
                    width="182px"
                    colorScheme='teal' variant='outline' onClick={formSubmitProvider}>Sign up </Button>
                </Box>
              </VStack>

            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </VStack>
  )
}
export default Register;