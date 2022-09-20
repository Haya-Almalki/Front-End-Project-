import React from 'react'
import {
  Heading,
  Image,
  Text,
  Stack,
  Button,
  Flex,
  HStack,
  Box,
  ModalOverlay,
  ModalFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure
} from '@chakra-ui/react'
import { Link, useLoction, useNavigate } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons'

function Categories({id,image,username,description,city,pricePerHour,rate}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();

  const takeAppointment = () => {
    navigate("/bookAppointment", {
      state: {
        providerName: username
      }
    })
  }
  return (
    <Stack key={id}
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
        src={image}
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
    <Link to={`/${username}/profileP`}>  {username} </Link>
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
          {description} 
          </ModalBody>
          <ModalFooter>
          <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HStack >
    
      <Text  >
      City: {city} 
      </Text>
    
      <Text>
      price: {pricePerHour}  SAR
      </Text>
      </HStack>
      <Box display='flex' mt='2' alignItems='center'>
        {Array(5)
          .fill('')
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i <rate ? '#ffd700' : 'gray.300'}
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
  )
}
export default Categories;


