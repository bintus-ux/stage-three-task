import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, Box } from '@chakra-ui/react'
import SigninForm from './components/auth/SigninForm'
import AuthDetails from './components/auth/AuthDetails'

const App = () => {
  return (
    <ChakraProvider>
      <Box p={4} className='layout'>
        <Routes>
          <Route path='/' element={<SigninForm />} />
          <Route path='/gallerypage' element={<AuthDetails />} />
        </Routes>
      </Box>
    </ChakraProvider>
  )
}

export default App