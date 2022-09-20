import { Input,Box,InputGroup,InputLeftAddon,HStack,Flex,VStack,Text,Button,Toast, useToast, Link, Image, Spacer,Select,Textarea,Divider,Spinner} from '@chakra-ui/react'
import profile from '../images/profile.png';
import Reviews from '../component/Reviews';
import { StarIcon} from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react';
import { useLocation,useParams} from "react-router-dom";




const ProfileP =()=>{

  const location = useLocation();
  //let username = location.state.username;
  //const username="as"
  const { username } = useParams();
  const [provider,setProvider]=useState()
  const [loading, setLoading] = useState(true);
  const [reviewList,setReviewList]=useState()






  useEffect(() => {
    const fetchPerson = async () => {
      setLoading(true);
      const request = await fetch('/api/v1/user/personByUsername/'+username);
      const data = await request.json();
      if (request.status === 200) {
        console.log(data);
        setProvider(data)
        setLoading(false);
      }
    };
    fetchPerson();
  }, []);


  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const request = await fetch('/api/v1/review/reviewByPerson/'+username);
      const data = await request.json();
      if (request.status === 200) {
        console.log(data);
        setReviewList(data)
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  







    const toast=useToast();

return(
  <>
  {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal"
          size="xl"
        />
      ) : (
  
  
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
         <Image src={setProvider.personAndSkill.userBody.image}  width={"13rem"} height={"13rem"}/>
         <Text fontSize="2rem" color="#121440">
          {provider.personAndSkill.userBody.username}
        </Text>
         </Box>
         <Divider />
        <VStack spacing="2" align="left">
            <HStack>
            <Text fontWeight="bold">From: </Text>
            <Text>{provider.personAndSkill.userBody.city}</Text>
            </HStack>
        <Divider />
            <Text fontSize={"1rem"} fontWeight="bold" > Description: </Text>
          <Text>{provider.personAndSkill.userBody.description}</Text>
          <Divider />
          <Text fontSize={"1rem"} fontWeight="bold" > Skills: </Text>
          <Text>{provider.personAndSkill.skills.map((item)=> 
           item.skill).join(", ")}</Text>
          <Text fontSize={"1rem"} fontWeight="bold" > Average rate: </Text>
          <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                w={6} h={6} 
                color={i <provider.rate ? 'teal.500' : 'gray.300'}
              />
            ))}
            </Box>
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
    <Text mb={"10"} ml={"400"} fontWeight="bold" fontSize={"2rem"} >{provider.personAndSkill.userBody.username} Reviews</Text>
   
    </HStack>
    <Reviews reviewList={reviewList}/>
      </VStack>
    </Flex>
  </HStack>
      )}
      </>
)


}
export default ProfileP;