import { Input,Box,InputGroup,InputLeftAddon,HStack,Flex,VStack,Text,Button,Toast, useToast, Link, Image, Spacer,Select,Textarea,Divider} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
const Reviews=({reviewList})=>{

return (
<VStack align="left" >
    {reviewList.map((item, index) => {
            return(
                <Box width={"100%"} pl={"1rem"}>
                    <Divider/>
                <VStack key={index} align="left" pl={"2rem"}>
                 <Divider/>
                 <HStack>
                    <Text fontWeight="bold">{item.username}</Text>
                    <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i <4 ? 'teal.500' : 'gray.300'}
              />
            ))}
            </Box>
                    </HStack>
                    <Text>{item.message}</Text>
                </VStack>
                </Box>
            )
})}
</VStack>
)

}
export default Reviews