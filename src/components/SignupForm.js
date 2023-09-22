import React, { useState } from 'react'
import { auth } from '../../firebase'
import { useForm } from 'react-hook-form'
import { FormLabel, FormControl, Input, Box, Button } from '@chakra-ui/react'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [error, setError] = useState(null)

  const {
    formState: { isSubmitting },
  } = useForm()

  const handleSubmit = (e) => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        console.log(useCredential)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <h1>Create Account</h1>
            <hr />
            <Box>
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
            Sign up
          </Button>
        </form>
      </div>
    </div>
  )
}
