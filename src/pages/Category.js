import {
  Heading,
  Image,
  Text,
  Stack,
  Button,
  Flex,
  VStack,
  Input,
  HStack,
  // IconButton,
  // Select,
  // FormControl,
  // FormLabel,
  // NumberInput,
  // NumberInputField,
  // NumberInputStepper,
  // NumberIncrementStepper,
  // NumberDecrementStepper,
  // Drawer,
  // DrawerOverlay,
  // DrawerContent,
  // DrawerHeader,
  // DrawerBody,
  SimpleGrid,
  Box,
  ModalOverlay,
  ModalFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,

} from '@chakra-ui/react'
//import {SearchIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import { StarIcon } from '@chakra-ui/icons'
//import Record from '../component/cityList.json'
import { Link, useLoction, useNavigate } from 'react-router-dom';

import Navbar from '../component/Navbar'
import Categories from '../component/Categories'
function Category({ category }) {
  const [providerList, setProviderList] = useState([])
  const [query, setQuery] = useState('')
  //const[price,setPrice]=useState()
  //const[rates,setRates]=useState()
  const [citys, setCitys] = useState('')
  //const[newlist,setNewlist]=useState([])
  const [providerName, setProviderName] = useState("")
  //let Copy=[];


  useEffect(() => {
    const fetchProvidersData = async () => {
      const request = await fetch('/api/v1/user/viewByCategoryWithRate/' + category);
      const data = await request.json();
      console.log(data)
      console.log(category)
      setProviderList(data)

    };
    fetchProvidersData()
  }, []);
  //console.log('type of rate',typeof rates)

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const takeAppointment = () => {
    navigate("/bookAppointment", {
      state: {
        providerName: providerName
      }
    })
  }
  const appointmentPage = () => {
    
  }
  // function getFilteredList() {
  //   Copy=providerList;
  //   console.log("copy value",Copy);
  //   if(citys){
  //    const City=Copy.filter((city)=>{city.personAndSkill.userBody.city.toLowerCase().includes(citys.toLowerCase())})
  // }
  // setNewlist(Copy)
  // }

  // useEffect(()=>{
  //  console.log("new list value",newlist);
  // },[newlist])

  return (
    <>
      <Heading >
        <Navbar />
      </Heading>
      {/* the filter section */}


      <Heading as='h3' size='lg' color='teal' >
        {category}  Category
      </Heading>
      <HStack justifyContent='left' marginLeft={40} marginBottom='20px' padding={2} >
        <Input type='text' placeholder='search' backgroundColor='white' focusBorderColor='red' width='30%' onChange={(e) => setQuery(e.target.value)} />
        {/* <IconButton aria-label='Search database' colorScheme='teal'width='20%' icon={<SearchIcon />} /> */}
      </HStack>


      <VStack spacing={4} height="100vh">
        {/* <SimpleGrid
      marginLeft={80}
       spacing={10}
      columns={4}
      >
      <Select placeholder='All Cities' bgColor='white' onChange={e=> setCitys(e.target.value) }
       >
    {Record.map(recored=>{
      return(
        <option key={recored.city_id} value={recored.name_en} >{recored.name_en}</option>
      )
      })}
    </Select>
    <Input type='number' max={100} min={5}  bgColor='white' placeholder='All Kind Of Price' onChange={e=> setPrice(e.target.value) }/>
     <Input type='number' max={5} min={0}  bgColor='white'  placeholder='All Kind Of Rate' onChange={e=> setRates(e.target.value) }/> 
     
    <Select placeholder='All Kind Of Rate' bgColor='white'   onChange={e=> setRates(Number(e.target.value)) }>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
    </Select>
  
    <Button justifyItems='left'  colorScheme='teal' width='20%' 
    onClick={getFilteredList}
    >filter</Button> 
      </SimpleGrid> */}

        <SimpleGrid
          direction={{ base: 'column', md: 'row' }}
          columns={3}
          padding={15}
          spacing={20}
          justifyContent='center'
          gap={3}
        >

          {/*The card section*/}
          {/* map start */}
          {/* pro.personAndSkill.userBody.city.toLowerCase().includes(citys.toLowerCase()) */}
          {(providerList
            .filter((pro) => { return (pro.personAndSkill.userBody.username.toLowerCase().includes(query.toLowerCase()) || pro.personAndSkill.userBody.description.toLowerCase().includes(query.toLowerCase())) })
            .filter((rc) => { return (rc.personAndSkill.userBody.city.toLowerCase().includes(citys.toLowerCase())) })
            //  .filter((rr)=>{console.log("type of rate",rates);return(rr.personAndSkill.rate===rates)})
            .map((pra) => (
              <Categories id={pra.personAndSkill.userBody.id} image={pra.personAndSkill.userBody.image}
              username={pra.personAndSkill.userBody.username} description={pra.personAndSkill.userBody.description}
              city={pra.personAndSkill.userBody.city} pricePerHour={pra.personAndSkill.userBody.pricePerHour}
              rate={pra.rate}


              />
       )))}

          {/* map end */}
        </SimpleGrid>
      </VStack>
    </>
  )
}

export default Category;
