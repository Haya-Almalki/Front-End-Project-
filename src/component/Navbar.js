import {
    Box,
    Image,
    Button,
    Container,
    Heading,
    Grid,
    Badge,
    FormControl,
    Input,
    Stack,
    Text,
    Flex,
    useBreakpointValue,
    HStack,
    ButtonGroup,
    Avatar,
    Select,
    UnorderedList,
    List,
    Link,
    VStack
  } from '@chakra-ui/react';
  import React from 'react'
  import logo from '../images/logo.png';
  import { HashLink } from 'react-router-hash-link';
  import profile from '../images/profile.png';
  import logoutImg from '../images/logout.png';
  import app from '../images/appointment.png';
  
  import { Link as ReactLink,useNavigate  } from 'react-router-dom';
  
  
  
  import {useState, useEffect, useRef} from 'react';
  
  
  function Navbar() {
    const navigate = useNavigate();
  
  
  
    const [open, setOpen] = useState(false);
  
  let menuRef = useRef();
  
  useEffect(() => {
    let handler = (e)=>{
      if(menuRef.current)
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };
  
    document.addEventListener("mousedown", handler);
    
  
    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  
  });
  
  const logout = async () => {
    const request = await fetch('/api/v1/user/logout');
    if (request.status === 204) {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('usename');
      localStorage.removeItem('role');
      console.log(request);
      navigate('/');
  
    }
  };
  
  
  return (
  
    
    <Box mb={"5"} as="section"  pb={{ base: '12', md: '24' }} height="5rem" pt={"auto"} bg="rgba(245, 234, 234, 0.422)">
    <Box as="nav" bg="bg-surface" height="5rem" pt={"auto"}   py={{ base: '1', lg: '2' }}>
      
        <HStack spacing="10" justify="space-between">
          <Link as={ReactLink} to="/">
      <Image boxSize="90px" src={logo} alt="brand" />
      </Link>
    
  
    <Flex justify="space-between" flex="1">
               
                <HStack spacing="3">
                {!localStorage.getItem('loggedIn') ? (<HStack ml={1200} color={"gray.500"}>
                <Button
                  rounded={'full'}
                 bg={'white'}
                  width="100px"
                  colorScheme='teal' variant='outline'
                  > <Link as={ReactLink}   fontSize='xl' to="/login"
                   _hover={{
                    color: "teal.500",
                  }}>Sign in</Link></Button>
                  <Button
                  rounded={'full'}
                  bg={'white'}
                   width="100px"
                   colorScheme='teal' variant='outline'
                   >
                  <Link as={ReactLink}  fontSize='xl' to="/register"
                   _hover={{
                    color: "teal.500",
                  }}>Sign up</Link></Button>
          </HStack>
        ) : (
                  
                
                
  
  <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          
          <img src={profile}></img>
  
        </div>
  
        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <Text align="center" fontSize='xl'>{localStorage.getItem('username')}</Text>
          <ul>
            <DropdownItem img = {profile} text = {"My Profile"} to={"/profile"}  />
  
            <DropdownItem img = {app} text = {"My appointments"}
             to={localStorage.getItem('role')=="PERSON"?"/providerAppointment":"/userAppointment"}  />
  
            <DropdownItem img = {logoutImg} text = {"Logout"} onclick={logout} />
          </ul>
        </div>
      </div> )}
                </HStack>
              </Flex>
              </HStack>
      </Box>
    </Box>
  
  
  )
  }
  
  function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <Image src={props.img} width={"1rem"} height={"1rem"}/>
      <Link as={ReactLink} fontSize='xs' to={props.to} onClick={props.onclick}>{props.text} </Link>
    </li>
  );
  }
  
  export default Navbar