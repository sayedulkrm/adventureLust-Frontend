import React from 'react';
import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';

const NotFound = () => {
  return (
    <Container h={'100vh'}>
      <VStack justifyContent={'center'} h={'full'} spacing={'5'}>
        <RiErrorWarningFill size={'5rem'} color="red" />

        <Heading>Page Not Found</Heading>

        <Link to={'/'}>
          <Button variant={'ghost'}>Go to Home</Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default NotFound;
