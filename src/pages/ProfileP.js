import { Input,Box,InputGroup,InputLeftAddon,HStack,Flex,VStack,Text,Button,Toast, useToast, Link, Image, Spacer,Select,Textarea,Divider} from '@chakra-ui/react'
import profile from '../images/profile.png';
import Reviews from '../component/Reviews';
import { useState } from 'react';
import { StarIcon } from '@chakra-ui/icons'



const ProfileP =()=>{
const [reviewList,setReviewList]=useState([
    {username:"Lubna",
    message:"She was nice to work with",
    rate:"5",},
    {username:"Lubna",
    message:"She was nice to work with",
    rate:"5",},
    {username:"Lubna",
    message:"She was nice to work with",
    rate:"5",},
    {username:"Lubna",
    message:"She was nice to work with",
    rate:"5",},
    {username:"Lubna",
    message:"She was nice to work with",
    rate:"5",},
]);

    const toast=useToast();

return(
    <HStack  width="100vw" height="100vh">
    <Flex
      height="100vh"
      width={['100%', '100%', '30%']}
      justifyContent="center"
      alignItems="center">
      <VStack
        mx="auto"
        align="left"
        spacing="5"
        height={"90%"}
        width={['90%', '90%', '90%']}>
        <Box align={"center"}>
         <Image src={profile}  width={"13rem"} height={"13rem"}/>
         <Text fontSize="2rem" color="#121440">
          Provider name
        </Text>
         </Box>
         <Divider />
        <VStack spacing="2" align="left">
            <HStack>
            <Text fontWeight="bold">From: </Text>
            <Text>London</Text>
            </HStack>
        <Divider />
            <Text fontSize={"1rem"} fontWeight="bold" > Description: </Text>
          <Text>Radiant rank in Valorant, 3500 hours in csgo. Ex pro in fortnite. I have experience in competing and can help you improve whether it be your aim or game sense.</Text>
          <Divider />
          <Text fontSize={"1rem"} fontWeight="bold" > Skills: </Text>
          <Text>Gaming</Text>
        </VStack>
      </VStack>
    </Flex>
    <Spacer/>
    <Flex
      justifyContent="left"
      alignItems="left"
      height="100%"
      width={'65%'}
      >
        <VStack align={"left"} mt={"3rem"} width={"100%"}>
            <HStack>
    <Text fontWeight="bold" fontSize={"2rem"} as='u'>Provider Reviews</Text>
    <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                w={6} h={6} 
                color={i <4 ? 'teal.500' : 'gray.300'}
              />
            ))}
            </Box>
    </HStack>
    <Reviews reviewList={reviewList}/>
      </VStack>
    </Flex>
  </HStack>
)


}
export default ProfileP;