import {
  Heading,
  VStack,
  Input,
  SimpleGrid,
  Select,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Categories from '../component/Categories'
import SA from '../component/SA'
function Category({ category }) {
  const [providerList, setProviderList] = useState([])
  const [query, setQuery] = useState('')
  const [citys, setCitys] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    const fetchProvidersData = async () => {
      const request = await fetch('/api/v1/user/viewByCategoryWithRate/' + category);
      const data = await request.json();
      console.log(data)
      console.log(category)
      setProviderList(data)};
    fetchProvidersData()
  }, []);
  window.scrollTo(0, 0);
  return (
    <>
      <Heading >
        <Navbar />
      </Heading>
      <Heading as='h3' size='lg' color='teal' >
        {category}  Category
      </Heading>
      <Button color='gray'  colorScheme='yellow'marginLeft='90%' marginBottom={30}  onClick={onOpen}>SEARCH</Button>
     <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtering data </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Heading as='h5' size='sm'>you can filter data by the name of provider or by what 
            you want from him or by the City he live in </Heading>
            <br/>
            <Input type='text' placeholder='search' backgroundColor='white' focusBorderColor='red' onChange={(e) => setQuery(e.target.value)} />   
      <Select  onChange={e=> setCitys(e.target.value)} >
        <option value="">All City</option>
{SA.cities.map((city,index) => (
<option key={index} value={city}>
{city}
</option> ))} 
</Select>
<br/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='yellow' mr={3} onClick={onClose}>
              Filter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack spacing={30} 
      justifyItems='center'
      height='100%' >
        
<HStack>
        <SimpleGrid
          direction={{ base: 'column', md: 'row' }}
          columns={3}
          gap={3}>
          {(providerList
            .filter((pro) => { return (
              pro.personAndSkill.userBody.username.toLowerCase().includes(query.toLowerCase())
               ||
                pro.personAndSkill.userBody.description.toLowerCase().includes(query.toLowerCase())
              ) })
              .filter((rc)=>{return(
                rc.personAndSkill.userBody.city.toLowerCase().includes(citys.toLowerCase())
              )})
            .map((pra) => (
              <Categories id={pra.personAndSkill.userBody.id} image={pra.personAndSkill.userBody.image}
              username={pra.personAndSkill.userBody.username} description={pra.personAndSkill.userBody.description}
              city={pra.personAndSkill.userBody.city} pricePerHour={pra.personAndSkill.userBody.pricePerHour}
              rate={pra.rate}
              />
       )))}
        </SimpleGrid>
        </HStack>
        </VStack>
     </>
  )}
export default Category;
