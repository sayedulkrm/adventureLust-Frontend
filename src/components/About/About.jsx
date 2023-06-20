import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

import introVideo from '../../assets/videos/Intro.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { data } from '../../assets/docs/TermsAndCondition';

const TandC = ({ TermsandCondition }) => (
  <Box>
    <Heading
      size={'md'}
      children="Terms & Condition"
      textAlign={'center'}
      my={'4'}
      mt={'8'}
    />

    <Box h={'sm'} p={'4'} overflowY={'scroll'}>
      <Text
        fontFamily={'heading'}
        letterSpacing={'widest'}
        textAlign={['center', 'left']}
      >
        {TermsandCondition}
      </Text>
      <Heading
        my={'4'}
        size={'xs'}
        children="** Please note that refunds are only available within 7 days of the purchase date. After this time, we are unable to offer refunds for any reason."
      />
    </Box>
  </Box>
);

const VideoPlayer = () => {
  return (
    <Box>
      <video
        autoPlay
        loop
        controls
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        src={introVideo}
      ></video>
    </Box>
  );
};

const Founder = () => {
  return (
    <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
      <VStack>
        <Avatar
          src="https://avatars.githubusercontent.com/u/100830568?v=4"
          boxSize={['40', '44']}
        />
        <Text textTransform={'uppercase'} children="Creator" opacity={0.7} />
      </VStack>

      <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
        <Heading children="Sayedul Karim" size={['md', 'xl']} />
        <Text
          textAlign={['center', 'left']}
          children={`Hi there! I'm Sayedul Karim, the founder of Wanderlust Adventures. As an avid traveler and adventurer, I started this website to share my passion for exploring the world and to help others do the same. Join me and our community of like-minded adventurers and let's explore the world together!`}
        />
      </VStack>
    </Stack>
  );
};

const About = () => {
  return (
    <Container
      maxWidth={'container.lg'}
      padding={'14'}
      boxShadow={'lg'}
      my={10}
    >
      <Heading children="About Us" textAlign={['center', 'left']} />

      <Founder />

      <Stack m={'8'} direction={['column', 'row']} alignItems={'center'}>
        <Text fontFamily={'cursive'} textAlign={['center', 'left']}>
          Welcome to Wanderlust Adventures! Our courses are designed to take you
          on a journey through some of the most breathtaking destinations around
          the world and show you the hidden gems that only the most intrepid
          travelers get to experience.
        </Text>

        <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme="yellow">
            Check out our plan
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />

      <TandC TermsandCondition={data} />

      <HStack my={'4'} p={'4'}>
        <RiSecurePaymentFill />
        <Heading
          size={'xs'}
          fontFamily={'sans-serif'}
          textTransform={'uppercase'}
          children="Payment is secured by Razorpay"
        />
      </HStack>
    </Container>
  );
};

export default About;
