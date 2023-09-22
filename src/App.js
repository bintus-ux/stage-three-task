import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, Box } from '@chakra-ui/react'
import SigninForm from './components/SigninForm'
import AuthDetails from './components/AuthDetails'
import Footer from './components/Footer'

const App = () => {
  return (
    <ChakraProvider>
      <Box p={4} className='layout'>
        <Routes>
          <Route path='/' element={<SigninForm />} />
          <Route path='/gallerypage' element={<AuthDetails />} />
        </Routes>
        <Footer />
      </Box>
    </ChakraProvider>
  )
}

export default App
