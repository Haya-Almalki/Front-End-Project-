import React from 'react'
import {
    Box,
    Image,
    Button,
    Container,
    Heading,
    Grid,
    Link,
  } from '@chakra-ui/react';
  import search from '../images/search.png';
  import submit from '../images/submit.png';
  import enjoy from '../images/enjoy.png';

  
function HowItWorks() {
    return (
        <Box id="how">
          <Container maxWidth="container.xl" my="20">
            <Heading align="center" as="h3" size="lg" pb="2" mb={10}>
              How does it work
            </Heading>
           
            <Grid
              templateColumns={{
                sm: 'repeat(1, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(3, 1fr)',
                base: 'repeat(1, 1fr)',
              }}
              gap={6}
            >
              <Box mx="auto" align="center" my={"auto"}>
                <Image w="60%" boxSize="90px" src={search} alt="search" />
                <Heading as="h5" size="md">
                  
                    <Box color="teal" pb="4" mt={5}>
                      Search for a person
                    </Box>
                  
                </Heading>
                <p>
                No matter where you live, or what are your interests, all you have to do is to Search for
                 a person that matches your interests and location
                </p>
              </Box>
    
              <Box mx="auto" align="center" my={"auto"}>
                <Image w="60%" boxSize="90px" src={submit} alt="submit"  />
                <Heading as="h5" size="md">
                  <Link>
                    <Box color="teal" pb="4">
                      Make an appointment
                    </Box>
                  </Link>
                </Heading>
                <p>
                 Once you find someone, you can choose the hours needed, write a request about the appointment
                 and submit it!

                </p>
              </Box>
              <Box mx="auto" align="center" my={"auto"}>
                <Image w="60%" boxSize="90px" src={enjoy} alt="enjoy" />
                <Heading as="h5" size="md">
                  <Box color="teal" pb="4">
                    <Link>Enjoy</Link>
                  </Box>
                </Heading>
                <Box fontSize="sm">
                After making an appointment, you have to wait till it become accepted, once it confirmed, 
                you will receive an email with all the appointment details
                </Box>
              </Box>
            </Grid>
          </Container>
        </Box>
      );
}

export default HowItWorks