import { Input,Box,InputGroup,InputLeftAddon,HStack,Flex,VStack,Text,Button,Toast, useToast, Link, Image, Spacer,Select,Textarea,Heading} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import SA from '../component/SA'
import profile from '../images/profile.png';
import SkillForm from '../component/SkillForm';
import Skill_list from '../component/Skill_list';
import Navbar from '../component/Navbar'


const Provider_profile =()=>{
  const [user,setUser]=useState(null)
  const [name,setName]=useState('User')
  const [email, setEmail] = useState('');
  const emailChange = (event) => setEmail(event.target.value)

  const [city, setCity] = useState('');
  const cityChange = (event) => setCity(event.target.value)

  const [password, setPassword] = useState('');
  const passwordChange = (event) => setPassword(event.target.value)

  const [password2, setPassword2] = useState('');
  const passwordChange2 = (event) => setPassword2(event.target.value)

  const [category, setCategory] = useState('');
  const categoryChange = (event) => setCategory(event.target.value)

  const [ratePerHour, setRatePerHour] = useState('');
  const ratePerHourChange = (event) => setRatePerHour(event.target.value)

  const [description, setDescription] = useState('');
  const descriptionChange = (event) => setDescription(event.target.value)

  const [skillList, setSkillList] = useState([]);
    const skillListChange = (event) => setSkillList(event.target.value)

  const [skillInput,setSkillInput]=useState([]);
  const skillInputChange = (event) => setSkillInput(event.target.value)


  const toast=useToast();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      const request = await fetch('/api/v1/user/me');
      const data = await request.json();
      if (request.status === 200) {
        setUser(data);
        setName(data.username)
        setEmail(data.email);
        setCity(data.city);
        setCategory(data.category)
        setDescription(data.description)
        setRatePerHour(data.pricePerHour)
        ///////////////////////////////////////
        const requestS = await fetch(`/api/v1/skill/personSkill/${data.username}`);
        const dataS = await requestS.json();
        console.log(dataS);
        let oldList1 = [...skillList];
        dataS.map((s)=>{
        oldList1.push(s);
        setSkillList(oldList1);
        })
        ////////////////////////////////////////
      } else if (request.status === 401) {
        localStorage.removeItem('loggedIn');
        navigate('/login');
      }
    };
    fetchUser();
  },[]);

  const updateProfile= async ()=>{
    const userCopy=user;
    userCopy.password=null;
    if(password===''&&password2===''){
      userCopy.email=email;
      console.log("copy email",userCopy.email)
      userCopy.city=city;
      console.log("copy city",userCopy.city)
      userCopy.description=description;
      console.log("copy description",userCopy.description)
      userCopy.pricePerHour=ratePerHour;
      console.log("copy price per hour",userCopy.pricePerHour)
      const request1 = await fetch('/api/v1/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {email:userCopy.email,
           city:userCopy.city,
           category:userCopy.category,
          description:userCopy.description,
          pricePerHour:userCopy.pricePerHour}),
      });
      const data1 = await request1.json();
      if (request1.status === 401) {
        toast({
          title: 'Error',
          description: data1.message,
          status: 'error',
          duration: 2000,
          isClosable: false,
          position: 'top',
        });} else{
          toast({
            title: 'Profile updated',
            status: 'success',
            duration: 2000,
            isClosable: false,
            position: 'top',
          });
        }
    }else{
  if(password===password2){
    userCopy.email=email;
    console.log("copy email",userCopy.email)
    userCopy.city=city;
    console.log("copy city",userCopy.city)
    userCopy.password=password;
    console.log("copy city",userCopy.city)
    userCopy.description=description;
    console.log("copy description",userCopy.description)
    userCopy.pricePerHour=ratePerHour;
    console.log("copy price per hour",userCopy.pricePerHour)
    const request2 = await fetch('/api/v1/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {email:userCopy.email,
         city:userCopy.city,
        password:password,
        category:userCopy.category,
       description:userCopy.description,
       pricePerHour:userCopy.pricePerHour}),
    });
    const data2 = await request2.json();
    if (request2.status === 401) {
      toast({
        title: 'Error',
        description: data2.message,
        status: 'error',
        duration: 2000,
        isClosable: false,
        position: 'top',
      });} else{
        toast({
          title: 'Profile updated',
          status: 'success',
          duration: 2000,
          isClosable: false,
          position: 'top',
        });
      }
  }else{
    toast({
      title: 'Mismatch password',
      description: "Please enter the passwords again",
      status: 'error',
      duration: 9000,
      isClosable: true,
    })}}};

    //addskill button
    const addSkill = async () => {
         const request2 = await fetch('/api/v1/skill/addSkill', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {skill:skillInput,
             personId:user.id}),
        });
        const requestA = await fetch(`/api/v1/skill/personSkill/${user.username}`);
        const dataA = await requestA.json();
        console.log(dataA);
        let oldListA = [];
        dataA.map((s)=>{
        oldListA.push(s);
        setSkillList(oldListA);
        setSkillInput('');
        })
      };
        ///delete skill button
        const deleteSkill=async(e)=>{
          console.log(e.target.id);

          const requestD = await fetch(`/api/v1/skill/delete/${e.target.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }});
            const dataD = await requestD.json();
            if(requestD.status===201){
              const requestD = await fetch(`/api/v1/skill/personSkill/${user.username}`);
        const dataD = await requestD.json();
        console.log(dataD);
        let oldListD = [];
        if(dataD.length!==0){
        dataD.map((s)=>{
        oldListD.push(s);
      });
        console.log(oldListD)
        setSkillList(oldListD);
      }else{
        setSkillList([]);
      }
       
            }
        };

return(
  <>
       <Heading >
        <Navbar />
      </Heading>
 
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
            {name}'s profile
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
            <Input type="email" placeholder="Username"  value={email} onChange={emailChange} width={"100%"}/>
            </VStack>

            <VStack width={['90%', '90%', '100%']} spacing="3" align="left">
            <Text >City:</Text>
            <Select value={city} onChange={cityChange} width={"100%"} >

                     {SA.cities.map((city,index) => (
                    <option key={index} value={city}>
                    {city}
                   </option> ))} 
                    </Select>

            {/* <Input type="text" placeholder="City" value={city} onChange={cityChange}width={"100%"}/> */}
            </VStack>
            </HStack>

            
            <HStack width={"100%"} spacing="5">
            <VStack width={['90%', '90%', '100']} spacing="3" align="left">
            <Text >Password:</Text>
            <Input type="password" placeholder="Password again"  value={password} onChange={passwordChange}  width={"100%"}/>
            </VStack>

            <VStack width={['90%', '90%', '100%']} spacing="3" align="left">
            <Text >Confirm Password:</Text>
            <Input type="password" placeholder="Password again" value={password2} onChange={passwordChange2} width={"100%"}/>
            </VStack>
            </HStack>

            <HStack width={"100%"} spacing="5">
            <VStack width={['90%', '90%', '100']} spacing="3" align="left">
            <Text >catagory:</Text>
            <Select placeholder='Art'value={category} onChange={categoryChange} >
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
            <Input type="number" placeholder="Rate per Hour" value={ratePerHour} onChange={ratePerHourChange} width={"100%"}/>
            </VStack>
            </HStack>

            {/* borderColor={"black"} borderWidth={"1rem"} */}

            <HStack width={"100%"} spacing="5" align='stretch'> 
            <VStack width={['50%', '50%', '50%']} spacing="3" align={"left"}>
            <Text >Description:</Text>
            <Textarea
            placeholder='Description'
            value={description} onChange={descriptionChange}
            size='sm'/>
            </VStack>

            <VStack width={['50%', '50%', '50%']} spacing="3" align="left" >
            <Text >Skills:</Text>
            <VStack borderColor={"#d0e3e2"} borderWidth='1px' padding={"1rem"} borderRadius={"3px"}>
            <SkillForm addSkill={addSkill} skillInput={skillInput} skillInputChange={skillInputChange}/>
            <Skill_list skillList={skillList} deleteSkill={deleteSkill}/>
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
            onClick={updateProfile}
          >
            Update profile
          </Button>
          </Box>
        </VStack>

        </HStack>
      </Flex>
      </>
)
}
export default Provider_profile;