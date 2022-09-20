import { Input,Box,InputGroup,InputLeftAddon,HStack,Flex,VStack,Text,Button,Toast, useToast, Link, Image, Spacer,Select,Textarea} from '@chakra-ui/react'


const SkillForm = ({addSkill,skillInput,skillInputChange}) => {
return (
    <HStack>
    <Input type="text" placeholder="Add Skill"  value={skillInput} onChange={skillInputChange} width={"100%"}/>
    <Box align={"center"}>
  <Button
    _hover={{
      backgroundColor: '#121440',
      transform: 'scale(1.05)',
    }}
    fontSize="0.75rem"
    width="4rem"
    height="2rem"
    color="white"
    backgroundColor="#121440"
    onClick={addSkill}>
    Add
  </Button>
  </Box>
    </HStack>
  );
};

export default SkillForm;