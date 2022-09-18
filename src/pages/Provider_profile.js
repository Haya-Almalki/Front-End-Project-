import { Input,Box,InputGroup,InputLeftAddon,HStack,Flex,VStack,Text,Button,Toast, useToast, Link, Image, Spacer,Select,Textarea} from '@chakra-ui/react'
import { useState } from 'react';
import profile from '../images/profile.png';
import SkillForm from '../component/SkillForm';
import Skill_list from '../component/Skill_list';

const Provider_profile =()=>{
    const [username, setUsername] = useState('');
    const usernameChange = (event) => setUsername(event.target.value)

    const [password, setPassword] = useState('');
    const passwordChange = (event) => setPassword(event.target.value)

const [skillList, setSkillList] = useState(["acrylic painting","acrylic painting","lae fklea gkl nal","acrylic painting","NJDKSNFJNS","acrylic painting"]);
    const skillListChange = (event) => setSkillList(event.target.value)

  
    const toast=useToast();

    const addSkill = () => {
        const oldList = [...skillList];
        oldList.push("inputValue");
        setSkillList(oldList);
        // setInputValue('');
      };


return(
    <Flex
        height="100%"
        width={'100%'}
        justifyContent="center"
        alignItems="center"
        
      >
            <HStack 
         spacing="0" 
          width="60%" 
          height="auto" 
          backgroundColor={"white"}
          borderColor={"#d0e3e2"}
          borderRadius={"5px"}
          borderWidth={"1px"}
          padding={"1rem"}
          mt={"5rem"}
          mb={"5rem"}
          align='stretch'>

        <VStack  height={"100%"} >
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
            Lubna's profile
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
            <Input type="email" placeholder="Username" width={"100%"}/>
            </VStack>

            <VStack width={['90%', '90%', '100%']} spacing="3" align="left">
            <Text >City:</Text>
            <Input type="text" placeholder="City" value={password} onChange={passwordChange} width={"100%"}/>
            </VStack>
            </HStack>

            
            <HStack width={"100%"} spacing="5">
            <VStack width={['90%', '90%', '100']} spacing="3" align="left">
            <Text >Password:</Text>
            <Input type="password" placeholder="Password again" value={username} onChange={usernameChange} width={"100%"}/>
            </VStack>

            <VStack width={['90%', '90%', '100%']} spacing="3" align="left">
            <Text >Confirm Password:</Text>
            <Input type="password" placeholder="Password again" value={password} onChange={passwordChange} width={"100%"}/>
            </VStack>
            </HStack>

            <HStack width={"100%"} spacing="5">
            <VStack width={['90%', '90%', '100']} spacing="3" align="left">
            <Text >catagory:</Text>
            <Select placeholder='Art' >
            <option value='Tutoring'>Tutoring</option>
            <option value='Gaming'>Gaming</option>
            <option value='Travelling'>Travelling</option>
            <option value='Shopping'>Shopping</option>
            <option value='Cooking'>Cooking</option>
            <option value='Art'>Art</option>
            <option value='Party Hosting'>Party Hosting</option>
            <option value='BabySitter'>BabySitter</option>
            </Select>
            </VStack>

            <VStack width={['90%', '90%', '100%']} spacing="3" align="left">
            <Text >Rate per Hour:</Text>
            <Input type="number" placeholder="Rate per Hour" value="5" width={"100%"}/>
            </VStack>
            </HStack>

            {/* borderColor={"black"} borderWidth={"1rem"} */}

            <HStack width={"100%"} spacing="5" align='stretch'> 
            <VStack width={['50%', '50%', '50%']} spacing="3" align={"left"}>
            <Text >Description:</Text>
            <Textarea
            placeholder='Description'
            size='sm'/>
            </VStack>

            <VStack width={['50%', '50%', '50%']} spacing="3" align="left" >
            <Text >Skills:</Text>
            <VStack borderColor={"#d0e3e2"} borderWidth='1px' padding={"1rem"} borderRadius={"3px"}>
            <SkillForm addSkill={addSkill}/>
            <Skill_list skillList={skillList} />
            </VStack>
            </VStack>
            </HStack>

         
            <Spacer/>
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
  
          >
            Update profile
          </Button>
          </Box>
        </VStack>

        </HStack>
      </Flex>
)
}
export default Provider_profile;