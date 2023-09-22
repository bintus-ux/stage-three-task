import React from 'react'
import { Box, Text, Container } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Container>
      <Box className='footer'>
        <Text fontSize='20px' style={{ color: 'teal' }}>
          &copy; 2023 Gallery Drag & Drop by Bintus
        </Text>
      </Box>
    </Container>
  )
}

export default Footer
