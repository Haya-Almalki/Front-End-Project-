import React from 'react'
import {
  Box,
  Container,
  Heading,
  Divider,
  List,
  ListItem,
  Link,
  Image,
  HStack,
} from '@chakra-ui/react';

import facebook from '../images/facebook.png';
import twitter from '../images/twitter.png';
import youtube from '../images/youtube.png';
import insta from '../images/insta.png';
function Footer() {
  return (
    <Box id='footer' mt={5} color="#ffffff" background="#212121" py="10">
      <Container maxWidth="container.xl">
        <Box display="flex" alignItems="center">
          <Heading mr="1rem" size="sm">Contact us:</Heading>
          <HStack>
            <Link mr="0" href='https://www.facebook.com/' isExternal>
              <Image boxSize='30px' src={facebook} />
            </Link>
            <Link mr="4" href='https://twitter.com/' isExternal>
              <Image boxSize='30px' src={twitter} />
            </Link>
            <Link mr="4" href='https://www.youtube.com/' isExternal>
              <Image boxSize='30px' src={youtube} />
            </Link>
            <Link mr="4" href='https://www.instagram.com/' isExternal>
              <Image boxSize='30px' src={insta} />
            </Link>
          </HStack>
        </Box>
        <Divider my="5" />

        <Box flex="1">
          <Heading size="sm">Teamwork</Heading>
          <List mt="4" spacing={2}>
            <ListItem>
              <Link color="#A2A2A2">Haya Almalki</Link>
            </ListItem>
            <ListItem>
              <Link color="#A2A2A2">Shahad Al-sager</Link>
            </ListItem>
            <ListItem>
              <Link color="#A2A2A2">Lubna Alsalem</Link>
            </ListItem>
            <ListItem>
              <Link color="#A2A2A2">Shahad Alzamzami</Link>
            </ListItem>
          </List>
        </Box>
        {/* bottom links */}

      </Container>
    </Box>
  );
}

export default Footer