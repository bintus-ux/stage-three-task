import React, { useState } from 'react'
import { auth } from '../firebase'
import { useForm } from 'react-hook-form'
import {
  FormLabel,
  FormControl,
  Input,
  Box,
  Button,
  Text,
} from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function SigninForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const {
    formState: { isSubmitting },
  } = useForm()

  const handleSubmit = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        console.log(useCredential)
        navigate('/gallerypage')
      })
      .catch((error) => {
        console.log(error)
        if (error) {
          setError(true)
        }
      })
  }

  return (
    <>
      <div className='form-wrapper'>
        <div className='form-content'>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <h1>Log into your Account</h1>
              <hr />
              <Box className='form'>
                <FormLabel htmlFor='name'>Email</FormLabel>
                <Input
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormLabel htmlFor='email'>Password</FormLabel>
                <Input
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <FormErrorMessage>
                {error.email && error.email.message}
              </FormErrorMessage> */}
              </Box>
            </FormControl>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={isSubmitting}
              type='submit'>
              Submit
            </Button>
            {error && (
              <Text color='red.500' mt={2}>
                Incorrect username or password
              </Text>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
