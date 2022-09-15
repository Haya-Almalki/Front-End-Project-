import { Input,Box,InputGroup,InputLeftAddon,HStack,Flex,VStack,Text,Button,Toast, useToast, Link ,TabList,Tab,Tabs,TabPanel,TabPanels,Select} from '@chakra-ui/react'
import { useState } from 'react';

const Register =()=>{
    return(
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
          <Text fontWeight="bold" fontSize="3rem" color="#121440">
          User Registration
          </Text>
          <VStack spacing="10">
        
          <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
          <Text >Profile Image:</Text>
          <Input type="file" placeholder="Profile Image" accept="image/*"/>
          </VStack>

            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >Username:</Text>
            <Input type="text" placeholder="Enter Username"/>
            </VStack>

            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >Password:</Text>
            <Input type="password" placeholder="Enter Password" />
            </VStack>

            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >Confirm Password:</Text>
            <Input type="password" placeholder="Enter Password again" />
            </VStack>

            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >Email:</Text>
            <Input type="email" placeholder="Enter Email"/>
            </VStack>

            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >City Location:</Text>
            <Input type="text" placeholder="Enter your City"/>
            </VStack>


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
            backgroundColor="#121440">Sign up </Button>
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
          <Text fontWeight="bold" fontSize="3rem" color="#121440">
          Provider Registration
          </Text>
          <VStack spacing="10">
        
          <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
          <Text >Profile Image:</Text>
          <Input type="file" placeholder="Profile Image" accept="image/*"/>
          </VStack>

            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >Username:</Text>
            <Input type="text" placeholder="Enter Username"/>
            </VStack>

            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >Password:</Text>
            <Input type="password" placeholder="Enter Password" />
            </VStack>

            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >Confirm Password:</Text>
            <Input type="password" placeholder="Enter Password again" />
            </VStack>

            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >Email:</Text>
            <Input type="email" placeholder="Enter Email"/>
            </VStack>

            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >City Location:</Text>
            <Input type="text" placeholder="Enter City"/>
            </VStack>

            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >Description:</Text>
            <Input type="text" placeholder="Enter Description"/>
            </VStack>

            <VStack width={['90%', '90%', '458px']} spacing="3" align="left">
            <Text >Skills:</Text>
            <Input type="text" placeholder="Enter your Skills"/>
            </VStack>

            <HStack  spacing="5" width={"90%"}>
            
            <VStack width={"50%"} spacing="3" align="left">
            <Text >Choose catagory:</Text>
            <Select placeholder='Select option' >
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

            <VStack width={"50%"} spacing="3" align="left">
            <Text >Price:</Text>
            <Input type="text" placeholder="Price per hour"/>
            </VStack>

            </HStack>
          </VStack>



          <Box align={"center"} pt="5rem">
          <Button
            _hover={{
              backgroundColor: '#121440',
              transform: 'scale(1.05)',
            }}
            fontSize="1.3rem"
            width="182px"
            color="white"
            backgroundColor="#121440">Sign up </Button>
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