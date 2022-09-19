
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
import {useEffect, useState } from 'react'
import { StarIcon } from '@chakra-ui/icons'
//import Record from '../component/cityList.json'
import {Link,useLoction,useNavigate} from 'react-router-dom';
import Appointment from './pages/Appointment'


function Category({category}) {
  const[providerList,setProviderList]=useState([])
  const[query,setQuery]=useState('')
  //const[price,setPrice]=useState()
  //const[rates,setRates]=useState()
  //const[citys,setCitys]=useState('')
  //const[newlist,setNewlist]=useState([])

  //let Copy=[];

  
  useEffect(() => {
    const fetchProvidersData = async () => {
      const request = await fetch(`http://localhost:8080/api/v1/user/viewByCategoryWithRate/${category}`);
      const data = await request.json();
      setProviderList(data)
     
    };
    fetchProvidersData()
   }, []);
console.log('type of rate',typeof rates)

const navigate = useNavigate();
const { isOpen, onOpen, onClose } = useDisclosure()
const takeAppointment=()=>{
navigate(Appointment,{
state:{
  providerName:pra.personAndSkill.userBody.username
}
})
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
    {/* the filter section */}
    
<Box backgroundColor='blackAlpha.400' height='40%' >
<Heading as='h4' size='lg'  color='gray' >
        {category}  Category
    </Heading> 
    <HStack  justifyContent='right' marginLeft={10} marginRight={10} marginBottom='20px' padding={2} > 
    <Input type='text' placeholder='search space ' backgroundColor='white' focusBorderColor='red' width='50%' onChange={(e)=> setQuery(e.target.value) }/>
    {/* <IconButton aria-label='Search database' colorScheme='teal'width='20%' icon={<SearchIcon />} /> */}
    </HStack>
    </Box>
    
   



    <VStack spacing={4}>
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
    direction={{base: 'column', md: 'row'}}
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
    .filter((pro)=>{return (pro.personAndSkill.userBody.username.toLowerCase().includes(query.toLowerCase())||pro.personAndSkill.userBody.description.toLowerCase().includes(query.toLowerCase()))} )
    // .filter((rc)=>{return(rc.personAndSkill.userBody.city.toLowerCase().includes(citys.toLowerCase()))}))
    //  .filter((rr)=>{console.log("type of rate",rates);return(rr.personAndSkill.rate===rates)})
   .map((pra)=>(
      <Stack key={pra.personAndSkill.userBody.id}
      borderWidth="1px"
      borderRadius="lg"
      w={{ sm: '100%', md: '540px',lg:'420px' }}
      height={{ sm: '476px', md: '20rem', lg:'15rem' }}
      direction={{ base: 'column', md: 'row'  }}
      bg="white" _dark={{ bg: "gray.900" }}
      boxShadow={'2xl'}
      padding={4}>
      <Flex flex={1} bg="gray.200">
        <Image
          objectFit="cover"
          boxSize="100%"
          rounded='lg'
          src={pra.personAndSkill.userBody.image}
        />
      </Flex>
      <Stack
        flex={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={1}
        pt={2}>
        <Heading fontSize={'2xl'} fontFamily={'body'}>
      <Link to={`/${pra.personAndSkill.userBody.username}/profileP`}>  {pra.personAndSkill.userBody.username} </Link>
        </Heading>
    
           <Button onClick={onOpen} colorScheme='teal' variant='link'>
           Description About me
           </Button> 
        
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>About Provider</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
            {pra.personAndSkill.userBody.description} 
            </ModalBody>
            <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <HStack >
      
        <Text  >
        City: {pra.personAndSkill.userBody.city} 
        </Text>
    
        <Text>
        price: {pra.personAndSkill.userBody.pricePerHour}  SAR
        </Text>
        </HStack>
        <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i <pra.rate ? '#ffd700' : 'gray.300'}
              />
            ))}
            </Box>
  
        <Stack 
          width={'100%'}
          mt={'2rem'}
          direction={'row'}
          padding={2}
          justifyContent={'space-between'}
          alignItems={'center'}>
        
          <Button
          onClick={takeAppointment} 
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'teal.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'teal.500',
            }}
            _focus={{
              bg: 'teal.500',
            }}>
            Book Appointment
          </Button>
        </Stack>
      </Stack>
    </Stack>
     )))}
    
 {/* map end */}

    

  </SimpleGrid>
  </VStack>
  </>
  )
}

export default Category;